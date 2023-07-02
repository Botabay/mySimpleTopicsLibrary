//it's a pseudo-code for end of monday-friday(ready for стажировка)

//step1 useState+getting from api
//step2 redux + getting from api

import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

// DAL(data access layer) test/api.ts
export const api = {
    loadItems() {
        return axiosInstance.get('/items')
    },
    deleteItem(id) {
        return axiosInstance.delete('/items/' + id)
    }
}


// UI formik | react-hook-form, material-ui
const ItemsPage = () => {
    // const [items, setItems] = useState([])//react-query,redux,redux-toolkit,rtk-query, appolo
    // const [status, setStatus] = useState('idle')//idle | loading
    // const [error, setError] = useState(null)
    const [items, setItems] = useSelector(s=>s.data.items)
    const [status, setStatus] = useSelector(s=>s.data.status)
    const [error, setError] = useSelector(s=>s.data.error)

    const dispatch=useDispatch()
    useEffect(() => {
        // setStatus('loading')
        // setError(null)
        // api.loadItems().then(res => {
        //     setItems(res.data)
        // }).catch(err => {
        //     setError(err)
        // }).finally(() => setStatus('idle'))
        dispatch(loadItemsTC())
    }, [])
    const deleteItem = (id) => {
        // setStatus('loading')
        // setError(null)
        // api.deleteItem(id).then(res => {
        //     setItems(items.filter(el => el.id !== id))
        // }).catch(err => {
        //     setError(err)
        // }).finally(() => setStatus('idle'))
        dispatch(deleteItemTC(id))
    }
    return (
        <div>
            {status === 'loading' && <span>{status}</span>}
            {!!error && <div>{error}</div>}
            {items.map(el => {
                // return <Item item={el} deleteItem={deleteItem} />
                return <Item item={el} key={el.id} />
            })}
        </div>
    )
}

const Item = (props) => {
    const dispatch=useDispatch()
    const deleteHandler = () => dispatch(deleteItemTC(props.item.id))
    return <div>
        {props.item.title}
        <button onClick={deleteHandler}>x</button>
    </div>
}

//redux
const initialState = {
    items: [],
    status: 'idle',
    error: null
}
const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'status-changed':
            return { ...state, status: action.status }
        case 'error-changed':
            return { ...state, error: action.error }
        case 'items-loaded':
            return { ...state, items: action.items }
           case 'item-updated':            
           return {...state,items:state.items.filter(el=>el.id===action.id?{...el}:el)}
        case 'item-deleted':
            return { ...state, items: state.items.filter(el => el.id !== action.itemId) }
        default:
            return state
    }
}
const itemsLoadedAC=(items)=>({type:'items-loaded',items})
const itemDeletedAC=(itemId)=>({type:'item-deleted',itemId})
const changeStatusAC=(status)=>({type:'status-changed',status})
const setErrorAC=(error)=>({type:'error-changed',error})

//thuncCreators
const loadItemsTC=(categoryId)=>(dispatch)=>{
   
    dispatch(changeStatusAC('loading'))
    dispatch(setErrorAC(null))
        api.loadItems(categoryId).then(res => {
            dispatch(itemsLoadedAC(res.data))
        }).catch(err => {
            dispatch(setErrorAC(err))
        }).finally(() =>  dispatch(changeStatusAC('idle')))
   
}

const deleteItemTC=(id)=>(dispatch)=>{
   
    dispatch(changeStatusAC('loading'))
    dispatch(setErrorAC(null))
        api.loadItems(id).then(res => {
            dispatch(itemsLoadedAC(res.data))
        }).catch(err => {
            dispatch(setErrorAC(err))
        }).finally(() =>  dispatch(changeStatusAC('idle')))
   
}