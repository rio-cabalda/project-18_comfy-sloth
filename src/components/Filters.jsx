import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      price,
      max_price,
      shipping  
      },
    updateFilters, 
    clearFilters,
    all_products} = useFilterContext()
 
  const categories = getUniqueValues(all_products, 'category')
  const companies = getUniqueValues(all_products, 'company')
  const colors = getUniqueValues(all_products, 'colors')   
  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e)=> e.preventDefault()}> {/* inside the form use a controlled input */}
    {/* search input */}
          <div className="form-control">
            <input type="text" name='text'
            placeholder='search' className='search-input'
            value={text} onChange={updateFilters}
            /> {/* name='text' is the same as the state property text(filter.text) */}
          </div>
    {/* end search input */}
    {/* categories */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((eachCategory, index)=>{
                return <button type='button' key={index} name='category' 
                        onClick={updateFilters}
                        className={`${category === eachCategory.toLowerCase() && 'active'}`}>
                          {eachCategory}
                        </button>
              })}
            </div>
          </div>
    {/* end categories */}
    {/* companies */}
          <div className="form-control">
              <h5>company</h5>
              <select name="company" value={company} onChange={updateFilters}
              className='company'>
                {companies.map((c, index)=>{
                  return <option key={index} value={c}>{c}</option>
                })}

              </select>
          </div>    
    {/* end companies */}
    {/* colors */}
           <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((c,index)=>{
                if(c==='all'){
                  return (
                      <button key={index} name='color' 
                              className={`${color === 'all' ? 'all-btn active' : 'all-btn'}`}
                              data-color={c}
                              onClick={updateFilters}>
                              all
                      </button>)
                    }
                return (
                <button key={index} name='color' 
                          style={{background: c}}
                          className={`${color === c ? 'color-btn active' : 'color-btn'}`}
                          data-color={c}
                          onClick={updateFilters}>
                            {color === c && <FaCheck />}
                  </button>)
              })}
            </div>
           </div>
    {/* end colors */}
    {/* price */}
            <div className="form-control">
                <h5>price</h5>
                <p className="price">{formatPrice(price)}</p>
                <input type="range" name="price" 
                min={min_price}
                max={max_price}
                onChange={updateFilters} 
                value={price}/>
            </div>
    {/* end of price */}
    {/* shipping */}
            <div className="form-control shipping">
              <label htmlFor="shipping">Free shipping</label>
              <input type="checkbox" name="shipping" id="shipping" 
              onChange={updateFilters} checked={shipping}
              />
              
            </div>
    {/* end of shipping */}
        </form>
      <button type="button" className='clear-btn' onClick={clearFilters}>Clear Filter</button>  
      </div>  
    </Wrapper>)
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-primary-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: max-content max-content;
    align-content: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
