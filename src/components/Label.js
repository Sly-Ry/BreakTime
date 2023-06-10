export default function Label({ title, changeTime, type, time, formatTime }) {
    return (
        <div id='break-label'>
            <h3 id='break-length'>{title}</h3>
            <div className='buttons'>
                <button 
                className='
                    btn-floating 
                    btn-flat 
                    btn-small 
                    waves-effect 
                    waves-red
                '
                onClick={() => changeTime(-60, type)}
                >
                <i className="material-icons red-text text-darken-4">
                    arrow_downward
                </i>
                </button>
                <h3>{formatTime(time)}</h3>
                <button 
                className='
                    btn-floating 
                    btn-flat 
                    btn-small 
                    waves-effect 
                    waves-green
                '
                onClick={() => changeTime(60, type)}
                >
                <i className="material-icons green-text text-darken-4">
                    arrow_upward
                </i>
                </button>
            </div>
        </div>
    )
}