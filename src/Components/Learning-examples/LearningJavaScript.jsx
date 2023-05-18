const person = {
    name: 'kevin',
    address: {
        line1: 'jasmin st',
        city: 'los banos',
        country: 'ph',
    },

    profiles: ['twitter', 'linkedIn', 'instagram',],

    printProfile: () => {
        person.profiles.map(
            (profile) => {
            console.log(profile)
            }   
        )


        
    }
}



export default function LearningJavaScript(){
    return(
        <>
        <div>{person.name}</div>
        <div>{person.profiles[1]}</div>
        <div>{person.address.city}</div>
        <div>{person.printProfile()}</div>
        </>
    )
}