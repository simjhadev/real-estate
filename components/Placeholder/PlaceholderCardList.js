import PlaceholderCard from './PlaceholderCard';

const PlaceHolderCardList = ({count}) => {
    let placeholderList = [];
    for(let i = 1; i <= count; i++){
        placeholderList.push(<PlaceholderCard key={"PHList"+i} />);
    }
    return(
        <>
        {placeholderList}
        </>
    );
}

export default PlaceHolderCardList;