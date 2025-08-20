from django.shortcuts import get_object_or_404
from .forms import ClientTranslationForm as ClientTranslationForm
from .models import User, ClientTranslation
from .models import ClientTranslation
from .serializers import ClientTranslationListSerializer, ClientTranslationDetailSerializer
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

from google.cloud import translate_v2 as translate


@api_view(['POST'])
def just_translate(request):
    # Get original_text instead of text to match frontend
    original_text = request.data.get("original_text", "")
    target_language = request.data.get("target_language", "")
    source_language = request.data.get("source_language", "")

    # Validate required fields
    if not original_text:
        return Response(
            {"error": "original_text is required"}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    if not target_language:
        return Response(
            {"error": "target_language is required"}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if not source_language:
        return Response(
            {"error": "source_language is required"}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    translate_client = translate.Client()

    try:
        # Prepare text for Clienttranslation
        if isinstance(original_text, bytes):
            text = [original_text.decode("utf-8")]
        elif isinstance(original_text, str):
            text = [original_text]
        else:
            return Response(
                {"error": "Invalid text format"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Perform Clienttranslation
        results = translate_client.translate(
            values=text,
            target_language=target_language,
            source_language=source_language
        )


        # Format response to match frontend expectations
        if results and isinstance(results, list):
            return Response({
                "Clienttranslations": [{
                    "output": result["translatedText"],
                    "detectedSourceLanguage": result.get("detectedSourceLanguage", ""),
                    "input": original_text
                } for result in results]
            })
        else:
            return Response(
                {"error": "ClientTranslation failed"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    except Exception as e:
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
def save_Clienttranslation(request):
    form = ClientTranslationForm(request.data,request.FILES)
    
    if form.is_valid():
        Clienttranslation = form.save(commit=False)
        Clienttranslation.user = request.user  # assign logged-in user
        Clienttranslation.save()
        
        return Response({
            'success': True,
            'data': ClientTranslationDetailSerializer(Clienttranslation).data
        })
    else:
        print('error', form.errors, form.non_field_errors)
        return Response({
            'success': False,
            'errors': form.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@authentication_classes([])  # Add your auth classes if needed
@permission_classes([])      # Add your permission classes if needed
def Clienttranslation_list(request):
    Clienttranslations = ClientTranslation.objects.all()
    
    user_id = request.GET.get('user_id', '')
    if user_id:
        Clienttranslations = Clienttranslations.filter(user_id=user_id)
        
    serializer = ClientTranslationListSerializer(Clienttranslations, many=True)
    
    return Response({
        'data': serializer.data
    })


@api_view(['GET'])
@authentication_classes([])  # Add your auth classes if needed
@permission_classes([])      # Add your permission classes if needed
def Clienttranslation_detail(request, pk):
    Clienttranslation = ClientTranslation.objects.get(pk=pk)
    serializer = ClientTranslationDetailSerializer(Clienttranslation, many=False)
    
    return JsonResponse(serializer.data)

@api_view(['DELETE'])
@permission_classes([])
def Clienttranslation_delete(request, pk):
    try:
        Clienttranslation = ClientTranslation.objects.get(pk=pk, user=request.user)
    except ClientTranslation.DoesNotExist:
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    Clienttranslation.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


