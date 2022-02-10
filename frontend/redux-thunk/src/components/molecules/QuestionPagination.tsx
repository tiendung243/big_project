import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import TableRow from '@material-ui/core/TableRow';

import QuestionRow, {QuestionRowUser} from '../molecules/QuestionRow';

interface IAuthor {
    id: number,
    first_name: string
}

interface IPost {
    id: number,
    title: string,
    comment: number,
    view: number,
    vote: number,
    created: string,
    author: IAuthor,
    tags: string[]
}

interface paginationProps {
    itemsPerPage: number,
    items: any,
    type: string
}

function Items(props:any) {
    const {posts, type} = props;
    return (
      <>
        {posts &&
          posts.map((post:IPost) => {
            return (
                <TableRow>
                    {
                      type == "home" ? (<QuestionRow post={post}/>) :
                      (<QuestionRowUser post={post}/>)
                    }
                    
                </TableRow>
            );
          })}
      </>
    );
  }

function PaginatedItems(props:paginationProps) {
    const {itemsPerPage, items, type} = props;
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
  
    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event:any) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <Items posts={currentItems} type={type}/>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="Previous"
          containerClassName={'pagination'} 
          activeClassName={'active'}
          nextLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          breakLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
        />
      </>
    );
  }

export default PaginatedItems;