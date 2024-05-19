import classNames from 'classnames'
import StyleLoading from './loading-image.module.css'

const LoadingImage = () =>{
    return <>
        <main className={classNames('w-full',[StyleLoading.flexContainer])}>
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

export default LoadingImage