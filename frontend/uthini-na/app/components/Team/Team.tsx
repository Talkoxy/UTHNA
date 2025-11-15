'use client'

const Team = () => {
    return(
        <main className="grid place-items-center team">
            <div className="grid place-items-center team-heading p-10">
                <h1>Our Team</h1>
                <p>Our team brings together performance artists, 
                    tech innovators, computer scientists 
                    and social science experts. 
                    They are united by one goal: 
                    to help you express yourself 
                    and understand others without language barriers.</p>
            </div>
            <div className="grid gap-5 place-items-center grid-flow-col">
                <div className="member"> 
                    <div>picture</div>
                    <h1>Rebone Mokgadi</h1>
                    <p> Chief Executive Officer and Chief Operations Officer</p>

                </div>

                <div className="member">

                    <div>picture</div>
                    <h1>Thandile Gush</h1>
                    <p> Co-Chief Executive Officer and Chief Marketing Officer</p>

                </div>

                <div className="member">
                    <div>picture</div>
                    <h1>Khethiwe A Gumede</h1>
                    <p> Chief Finance Officer</p>

                </div>

                <div className="member">
                    <div>picture</div>
                    <h1>Russell Mlanga</h1>
                    <p>Chief Tech Officer</p>

                </div>
            </div>
                
        </main>
    );
}

export default Team;