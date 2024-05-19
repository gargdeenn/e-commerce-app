import StyleLoading from './loading.module.css'

const Loading = () =>{
    return <>
        <main className={StyleLoading.flexContainer}>
            <div className={StyleLoading.dotSpinner}>
                <div className={StyleLoading.dotSpinner__dot}></div>
                <div className={StyleLoading.dotSpinner__dot}></div>
                <div className={StyleLoading.dotSpinner__dot}></div>
                <div className={StyleLoading.dotSpinner__dot}></div>
                <div className={StyleLoading.dotSpinner__dot}></div>
                <div className={StyleLoading.dotSpinner__dot}></div>
                <div className={StyleLoading.dotSpinner__dot}></div>
                <div className={StyleLoading.dotSpinner__dot}></div>
            </div>
        </main>
    </>
}

export default Loading