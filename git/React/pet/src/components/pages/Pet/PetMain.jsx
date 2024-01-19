import React,{useState} from 'react';
import '../../styles/Community.css';
import PetList from './PetList';
import Category from './Category';
import { agoDate } from '../../../util/DateFormat';

export default function PetMain() {
    const [query, setQuery] = useState({
        noticeSdt : agoDate(new Date(), 12),
        noticeEdt : "",
        kindCd : "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setQuery({...query, [name]: value});
    };

    return(
        <div className='community'>
            <Category query={query} onChange={handleChange} />
            <PetList />
        </div>
    )
}