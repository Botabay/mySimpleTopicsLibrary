//typing of actions
    //variant 1
type ActionAType={type:'aa',payload:PayloadAType}
type ActionBType={type:'bb',payload:PayloadBType}
type ActionsType= ActionAType| ActionBType
    //variant 2: by ReturnType + typeof + as
type ActionAType=typeof ({type:'aa',payload:PayloadAType} as const) //by ReturnType
type ActionBType=typeof ({type:'bb',payload:PayloadBType} as const)
type ActionsType= ActionAType| ActionBType

//typing of actionCreators
    //variant 1
const firstAC(value: valueType):ActionAType=>({type:'aa',payload:'pp'})
    //variant 2 by ReturnType + typeof + as
type ActionAType=ReturnType<typeof firstAC>
const firstAC(value: valueType)=>({type:'aa',payload:'pp'}as const)

//typing of 'context API', lesson44
const StoreContext = React.createContext({}as StoreType)
export type ProviderType= {
    store: StoreType,
    children: React.ReactNode
}

export const Provider =(props: ProviderType)={
    return (
        <StoreContext.Provider value={props.store}>
        {props.children}
        <StoreContext.Provider/>
    )
}

//typing of store
const rootReducer = combineReducers({ reducerA,reducerB})
type AppStateType =ReturnType<typeof rootReducer>

//typing of reducerA
    //variant1
const initialState:initialStateType={ field:[]}
type initialStateType={field:Array<FieldType>}
const reducerA=(state:initialStateType=initialState,action: ActionsType):initialStateType={
    switch (key) {
        case value:
        default:
    }
}
//typing of mapStateToProps, mapDispatchToProps, reducer lesson45-49
type MapStateToPropsType ={
    statePart:initialStateType//from reducerA
}
const mapStateToProps=(state:AppStateType):MapStateToPropsType=>{
    return {
        statePart:state.statePart//from reducerA
    }
}

type MapDispatchToPropsType ={
    someA: (value:number)=>void,
}
//type"Dispatch" must take from  redux(requires field of object('type')of action)
const mapDispatchToProps=(dispatch:Dispatch):MapDispatchToPropsType=>{
    return {
        someA:(value:number)=>{dispatch(someAC(value))},
    }
}
const componentContainer= connect(mapStateToProps,mapDispatchToProps)(component);
type componentPropsType=MapStateToPropsType & MapDispatchToPropsType

//typing of initialState
const initialState={
    f:[] as Array<fType>,
    a:4
}
type initialStateType = typeof initialState;

//typing of withRouter, lesson60
import {RouterComponentProps} from 'react-router'
type PathParamsType={id:string}
type OwnPropsType=MapStateToPropsType & MapDispatchToPropsType
type PropsType=RouterComponentProps<PathParamsType> & OwnPropsType
const ProfileContainer=(props:PropsType)=>{}
let withComp=withRouter(ProfileContainer)

//typing of withAuthRedirect HOC,lesson69
function withAuthRedirect<T>(Component: ComponentType<T>){
    const RedirectComponent =(props:MapStatePropsType)=>{
        return <Component {...props as T}/>
    }
    return connect(mapStateToProps)(RedirectComponent)
}

//typing of compose,lesson 70
compose<ComponentType>()

//typing of redux-form, lesson75
type FormDataType={
    login:string
}
const LoginForm: FC<InjectedFormProps<FormDataType>>=()=>{}
const LoginReduxForm = reduxForm<FormDataType>({form:'login'})(LoginForm)
const Login=()=>{
    return (
        <LoginReduxForm/>
    )
}