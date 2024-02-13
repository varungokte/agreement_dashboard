import React, { useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "./ui/table"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "./ui/pagination"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "./ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "./ui/drawer"
import { Popover, PopoverContent, PopoverTrigger, } from "./ui/popover"

import asc from "./../asc.svg"
import dsc from "./../dsc.svg"


function Dashboard(){
	const [items, setItems] = useState ([
		[0, "Ben Quadrinaros", "Jabba the Hutt", "Mos Espa"],
		[1, "Quinlan Vos",	"Marg Krim", "Oba Diah"],
		[2, "Cad Bane", "Darth Sidious", "Mandalore"],
		[3, "Tion Medon", "Nix Card", "Muunilist"],
		[4, "Asajj Ventress", "Hondo Ohnaka", "Florrum"],
		[5, "Orn Free Taa", "Hego Damask", "Coruscant"],
		[6, "Greez Dritus", "Wilhuff Tarkin", "Koboh"],
		[7, "Del Meeko", "Mas Amedda", "Jakku"],
		[8, "Finis Valorum", "Marg Krim", "Eriadu"],
		[9, "Willrow Hood", "Nix Card", "Bespin"],
		[10, "Figrin D'an", "Jabba the Hutt", "Tatooine"],
		[11, "Cal Kestis", "Trilla Suduri", "Bogano"]
  ]);

	const [borrowerName, setBorrowerName] = useState("");
	const [lenderName, setLenderName] = useState("");
	const [city, setCity] = useState("");

	const [pageLength, setPageLength] = useState(2)	
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(Math.ceil(items.length/pageLength));
  const [ascending, setAscending] =  useState([true,false,false,false]);
  const [sortingField, setSortingField] = useState(0);
  
	const addAgreement = (e: any) =>{
		e.preventDefault();
		setItems(itemlist =>{
			return [...itemlist,[borrowerName, lenderName, city]]
		})
	}

  const changePageLength = (e: any) =>{
    e.preventDefault();
    setPageLength(Number(e.target.value));
    setTotalPages(Math.ceil(items.length/Number(e.target.value)))
    setCurrentPage(1)
    return
  }

  const sortByCategory = (cat: number) =>{
    setSortingField(cat)
    if (cat===0) {
      const arr = [...items]
      if (ascending[0])
        arr.sort((a,b)=>{return Number(b[0])-Number(a[0])})
      else
        arr.sort((a,b)=>{return Number(a[0]) - Number(b[0])})
      const arr2 = [false,false,false,false]
      arr2[0]=!ascending[0]
      setAscending(arr2)
      setItems(arr)
    }
    else {
      const arr = [...items]
      if (ascending[cat])
        arr.sort((a,b)=>{return String(b[cat]).localeCompare(String(a[cat]))})
      else
        arr.sort((a,b)=>{return String(a[cat]).localeCompare(String(b[cat]))})
      
      const arr2 = [false,false,false,false]
      arr2[cat]=!ascending[cat]
      setAscending(arr2)
      setItems(arr)
    }
  }

  const handlePagination = () => {
    if (totalPages<3)
      return <></>
    if (totalPages===3){
      return (
      <PaginationItem>
        <PaginationLink onClick={()=> setCurrentPage(2)} isActive={currentPage===2}>2</PaginationLink>
      </PaginationItem>)
    }

    if (currentPage<=2){
      return (<>
      <PaginationItem>
        <PaginationLink onClick={()=> setCurrentPage(2)} isActive={currentPage===2}>2</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      </>)
    }
    if (currentPage==totalPages-1){
      return(<>
        <PaginationItem>
            <PaginationEllipsis/>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={()=> setCurrentPage(currentPage)} isActive={currentPage===currentPage}>{currentPage}</PaginationLink>
        </PaginationItem>
      </>)
    }

    if (currentPage===totalPages){
      return(<>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={()=> setCurrentPage(currentPage-1)} isActive={currentPage===currentPage-1}>{currentPage-1}</PaginationLink>
        </PaginationItem>
        </>)
    }

    return(<>
    <PaginationItem>
        <PaginationEllipsis/>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink onClick={()=> setCurrentPage(currentPage-1)} isActive={currentPage===currentPage-1}>{currentPage-1}</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink onClick={()=> setCurrentPage(currentPage)} isActive={currentPage===currentPage}>{currentPage}</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink onClick={()=> setCurrentPage(currentPage+1)} isActive={currentPage===currentPage+1}>{currentPage+1}</PaginationLink>
    </PaginationItem>
    <PaginationItem>
        <PaginationEllipsis/>
    </PaginationItem> 
    </>)
  }

	return(
		<div>
			<div className='row row-cols-2'>
				<div className='col-9'>
					<Dialog>
						<DialogTrigger><button className='btn btn-primary'>Add New Agreement</button></DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add a new agreement</DialogTitle>
							</DialogHeader>
							<div>
								<form onSubmit={addAgreement}>
									<div className="mb-3">
										<label htmlFor="borrowerName" className="form-label">Borrower Name</label>
										<input type="text" className="form-control" id="borrowerName" onChange={(e)=>{
											setBorrowerName(e.target.value)
										}}/>
									</div>

									<div className="mb-3">
										<label htmlFor="lenderName" className="form-label">Lender Name</label>
										<input type="text" className="form-control" id="lenderName" onChange={(e)=>{
											setLenderName(e.target.value)
										}}/>
									</div>
									
									<div className="mb-3">
										<label htmlFor="cityName" className="form-label">City</label>
										<input type="text" className="form-control" id="cityName" onChange={(e)=>{
											setCity(e.target.value)
										}}/>
									</div>
									<DialogFooter>
										<DialogClose>
											<button type="submit" className="btn btn-outline-primary">Submit</button>
										</DialogClose>
									</DialogFooter>
								</form>
							</div>
						</DialogContent>
					</Dialog>
				</div>
				
				<div className='input-group mb-3 w-25 col align-bottom mb-5'>
					{/* <input type="text" className="form-control" placeholder="Find an Agreement" aria-label="Search" aria-describedby="button-addon2"/>
					<button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button> */}
				</div>
			  </div>
          <br/>

        <div className='d-flex'>
          <div className='flex w-75'>
            <p>Show <select name='page-length' onChange={(e)=>{changePageLength(e)}}>
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option></select> entries per page</p>
          </div>

          <div className='px-3 flex'>  	
            <Popover>
              <PopoverTrigger>
                <button className='btn btn-success'>Filter</button>
              </PopoverTrigger>
              <PopoverContent>Place content for the popover here.</PopoverContent>
            </Popover>
            </div>
        </div>
			<br/>
			<Table className=''>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[10%]">
              <button onClick={() => sortByCategory(0)}>
                <div className='d-flex'>
                  <div className='flex'>Agreement ID </div> 
                  <div className='flex'>
                    {(sortingField===0)?(ascending[0]?<img src={asc}/>:<img src={dsc}/>):""}
                    </div>
                </div>
              </button>
            </TableHead>
						
            <TableHead className='w-[30%]'>
              <button onClick={() => sortByCategory(1)}>
                <div className='d-flex'>
                  <div className='flex'>Borrower Name</div>
                  <div className='flex'>
                    {(sortingField===1)?(ascending[1]?<img src={asc}/>:<img src={dsc}/>):""}
                    </div>
                </div>
              </button>
            </TableHead>
						
            <TableHead className='w-[30%]'>
              <button onClick={() => sortByCategory(2)}>
                <div className='d-flex'>
                  <div className='flex'>Lender Name</div>
                  <div className='flex'>
                  {(sortingField===2)?(ascending[2]?<img src={asc}/>:<img src={dsc}/>):""}
                  </div>
                </div>
              </button>
            </TableHead>
						
            <TableHead className='w-[20%]'>
              <button onClick={() => sortByCategory(3)}>
                <div className='d-flex'>
                  <div className='flex'>City</div>
                  <div className='flex'>
                  {(sortingField===3)?(ascending[3]?<img src={asc}/>:<img src={dsc}/>):""}
                  </div>
                </div></button></TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{items.map((item, index) =>{
						if (index<(currentPage-1)*pageLength || index>=currentPage*pageLength)
							return 
						return (
						<TableRow>
							<TableCell>
              <Drawer>
                <DrawerTrigger>
                <p className='link-primary'>{Number(item[0])+1}</p></DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Agreement Details</DrawerTitle>
                  </DrawerHeader>
                  <div  className='pl-5'>
                    <p><b>Agreement ID:</b> {Number(item[0])+1}</p>
                    <p><b>Borrower Name:</b> {item[1]}</p>
                    <p><b>Lender Name:</b> {item[2]}</p>
                    <p><b>City:</b> {item[3]}</p>
                  </div>
                  <DrawerFooter>
                    <DrawerClose>
                      <button>Close</button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
                </TableCell>
							<TableCell>{item[1]}</TableCell>
							<TableCell>{item[2]}</TableCell>
							<TableCell>{item[3]}</TableCell>
						</TableRow>)
					})}
				</TableBody>
			</Table>
			<br/>
		<div className='row'>
			<div className='col mt-1'>
			  <p>Showing {(currentPage-1)*pageLength+1}-{Math.min(pageLength*currentPage, items.length)} of {items.length}</p>
			</div>
			{items.length>pageLength?
			<div className='col'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => (currentPage>1)?setCurrentPage(curr=>{return(curr-1)}):""}/>
            </PaginationItem>
            
            <PaginationItem>
              <PaginationLink onClick={()=> setCurrentPage(1)} isActive={currentPage===1}>1</PaginationLink>
            </PaginationItem>

            {handlePagination()}
          
            <PaginationItem>
              <PaginationLink onClick={()=> setCurrentPage(totalPages)} isActive={currentPage===totalPages} >{totalPages}</PaginationLink>
            </PaginationItem>
            
            <PaginationItem>
              <PaginationNext onClick={() => (currentPage<totalPages)?setCurrentPage(curr=>{return(curr+1)}):""} />
            </PaginationItem>
            
          </PaginationContent>
        </Pagination>
			</div>:""}
		</div>
	</div>
	)     
}

export default Dashboard;