export default function Dice(props) {
    const style ={
        backgroundColor: props.isHeld? "#59E391" : "white"
    }

    return (
        <button 
        style = {style} 
        className="dice-button"
        onClick={()=> props.hold(props.id)}
         >{props.value}</button>
    );
}