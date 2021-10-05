

const  SearchBox= ({value,onChange}) => {
    return (

        <input
        type='text'
        name='query'
        className="form-control"
        placeholder="Search here..."
        value={value}
        onChange={(e)=>(onChange(e.currentTarget.value))}
        />
      );
}
 
export default SearchBox;