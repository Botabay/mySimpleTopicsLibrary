type PropsType={
    name:string
    onClick:()=>void
    disabled:boolean
}
export const Button=(props:PropsType)=>{
    const onClickHandler=()=>{
        props.onClick()
    }
    return (
        <button onClick={onClickHandler} disabled={props.disabled}> {props.name}</button>
    )
}