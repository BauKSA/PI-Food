export default function Recipe({name, img}){
    
    return(
        <div>
            <h1>{name}</h1>
            <img src={img} alt="recipe"/>
        </div>
    )
}