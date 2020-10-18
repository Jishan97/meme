import React from 'react'
//meme count
import MemeCount from './adminControlSub/memecount/MemeCount'
//meme tags and trending topics
import MemeTagTrend from './adminControlSub/memetagtrend/MemeTagTrend'
//trophy segment
import TrophySegment from '../adminControl/adminControlSub/trophysegment/TrophySegment'
//upcoming event 
import UpcomingEvent from '../adminControl/adminControlSub/upcomingevent/UpcomingEvent'
//upcoming event

//meme of the day

//trophy segment



const AdminControl = () => {
    return (
        <div>
            <div class="accordion" id="accordionExample">
            <MemeCount/>
            <MemeTagTrend/>
            <TrophySegment/>
            <UpcomingEvent/>
            </div>
        </div>

    )
}

export default AdminControl
