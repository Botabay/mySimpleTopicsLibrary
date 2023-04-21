import s from './CountView.module.css'
type PropsType = {
    count: number
}

export const CountView=(props:PropsType)=>{
    return (
        <div className={s.based+' '+ (props.count===5 && s.red)}>
            {props.count}
        </div>
    )
}


// export const CountView = (props: PropsType) => {
//     const calcClassName = s.based + " " + (props.count === 5 && s.red);
//     return (
//         <div className={calcClassName}>
//             {props.count}
//         </div>
//     )
// }