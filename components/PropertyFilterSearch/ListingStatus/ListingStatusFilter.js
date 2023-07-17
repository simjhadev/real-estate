import CustomPopover from '../CustomPopover';
import ListingStatusFilterOptions from './ListingStatusFilterOptions';

const ListingStatusFilter = ({onListingStatusChange, listingStatus}) => {
    

    return(
        <CustomPopover filterName={listingStatus.displayTxt} popoverHeader='Listing Status'>
            <ListingStatusFilterOptions onListingStatusChange={onListingStatusChange}
            listingStatus={listingStatus}/>
        </CustomPopover>
    )
};

export default ListingStatusFilter;

