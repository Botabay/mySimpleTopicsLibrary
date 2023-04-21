import './App.css';
import { CountView } from './components/CountView'
import { Button } from './components/Button'
import { useState } from 'react'

export const App = () => {
    const [countSt, setCountSt] = useState<number>(0);
    const toInc = () => {
        let count = countSt + 1;
        if (count>5) {count =5;}
        setCountSt(count);
    }
    const toReset = () => {
        setCountSt(0);
    }
    return (
        <div className="App">
            <CountView count={countSt} />
            <div>
                <Button name={'inc'} onClick={toInc} disabled={countSt===5}/>
                <Button name={'reset'} onClick={toReset} disabled={countSt===0}/>
            </div>
        </div>
    );
}

// export const App = () => {
//     const [countSt, setCountSt] = useState<number>(0);
//     const [disabledIncSt, setDisabledIncSt] = useState<boolean>(false);
//     const [disabledResetSt, setDisabledResetSt] = useState<boolean>(true);
//     const toInc = () => {
//         let count = countSt + 1;
//         if (count>5) {count =5;setDisabledIncSt(true)}
//         setCountSt(count);
//         setDisabledResetSt(false)
//     }
//     const toReset = () => {
//         setCountSt(0);
//         setDisabledIncSt(false)
//         setDisabledResetSt(true)
//     }
//     return (
//         <div className="App">
//             <CountView count={countSt} />
//             <div>
//                 <Button name={'inc'} onClick={toInc} disabled={disabledIncSt}/>
//                 <Button name={'reset'} onClick={toReset} disabled={disabledResetSt}/>
//             </div>
//         </div>
//     );
// }

