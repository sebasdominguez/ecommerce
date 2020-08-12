import React from 'react'
import { connect } from 'react-redux'
import AdminProducts from '../components/AdminProducts'
import Products from '../components/Products'
import { setCategory, findCategorys } from "../store/actions/Category";
import { creatingProduct, deletingProduct, updatingProduct} from "../store/actions/Products"

const mapStateToProps = function (state, ownProps) {

    return {
        categorys: state.categorys.categorys,
        products: state.products.products
  };
}
  
  const mapDispatchToProps = function (dispatch, ownProps) {
    
    return {

      findCategorys: () => dispatch(findCategorys()),
      setCategory: (id) => dispatch(setCategory(id)),
      creatingProduct: (body) => dispatch(creatingProduct(body)),
      deletingProduct: (body) => dispatch(deletingProduct(body)),
      updatingProduct: (body) => dispatch(updatingProduct(body)),
      findProductByTitle: (body) => dispatch(findProductByTitle(body))

      }
    };
 
class AdminProductsContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          //Creating
           urlImageValue:'',
           categoryId: '',
           priceValue: '',
           nameValue: '',
           //Deleting
           idValue:'',
           //Updating
           urlImageUP:'',
           priceUP: '',
           idUP:'',
           nameUP: '',
           categoryId: '',
        };
        this.setCategoryState = this.setCategoryState.bind(this);
        this.setUrl =  this.setUrl.bind(this);
        this.setPrice = this.setPrice.bind(this);
        this.setName =  this.setName.bind(this);
        // Deleting
        this.setId =  this.setId.bind(this); 
        // Upadating
        this.setUrlUP = this.setUrlUP.bind(this);
        this.setPriceUP = this.setPriceUP.bind(this);
        this.setNameUP = this.setNameUP.bind(this);
        this.setIdUP = this.setIdUP.bind(this);
        //handle
        this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
       this.handleSubmitDelete = this.handleSubmitDelete.bind(this)
       this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
       /* this.handleChange = this.handleChange.bind(this) */
      }
    componentDidMount() {
        this.props.findCategorys();
      }
   //url
    setUrl(event){ 
        let value = event.target.value
        this.setState({urlImageValue: value})
    }
   setUrlUP(event){ 
        let value = event.target.value
        this.setState({urlImageUP: value})
    }
    // Price
    setPrice(event){
        let value = Number(event.target.value)
        this.setState({priceValue: value})
    }
    setPriceUP(event){
        let value = Number(event.target.value)
        this.setState({priceUP: value})
    }
    //Name
    setName(event){
        let value = event.target.value
        this.setState({nameValue:  value})
    }
    setNameUP(event){
        let value = event.target.value
        this.setState({nameUP:  value})
    }
    //Id
     setId(event){
        let value = Number(event.target.value)
        console.log(value)
        this.setState({idValue:  value})
    } 
    setIdUP(event){
        let value = Number(event.target.value)
        console.log(value)
        this.setState({idUP:value})
    } 

 //Category
    setCategoryState(value) {
        this.setState({
          categoryId: value,
        });
      } 

    handleSubmitCreate(event){
        event.preventDefault()
        this.props.creatingProduct({
            title: this.state.nameValue,
            picture: this.state.urlImageValue,
            price: this.state.priceValue,
            categoryId: this.state.categoryId,
        })

        this.setState({ 
        urlImageValue:'',
        priceValue: '',
        nameValue: '',})
    }
    
  handleSubmitDelete(event){
        event.preventDefault()

        this.props.deletingProduct({id:this.state.idValue})

        this.setState({
            idValue:''
        })
    }
    handleSubmitUpdate(event){
        event.preventDefault()
        this.props.updatingProduct({
         id: this.state.idUP,
         title: this.state.nameUP,
         picture: this.state.urlImageUP,
         price: this.state.priceUP
        })
        this.setState({ 
            idUP:'',
            urlImageUP:'',
            priceUP: '',
            nameUP: '',})
    }

    render(){
        return(
            <>
            <AdminProducts 
             setUrl = {this.setUrl}
             setPrice = {this.setPrice}
             setName = {this.setName}
             setId = {this.setId}
             setCategoryState = {this.setCategoryState}
             valueUrl = {this.state.urlImageValue}
             valueName = {this.state.nameValue}
             valueId = {this.state.idValue}
             valuePrice = {this.state.priceValue}
             //Updating
             valueUrlUP = {this.state.urlImageUP}
             valueNameUP = {this.state.nameUP}
             valueIdUP = {this.state.idUP}
             valuePriceUP = {this.state.priceUP}
             setUrlUP = {this.setUrlUP}
             setPriceUP = {this.setPriceUP}
             setNameUP = {this.setNameUP}
             setIdUP = {this.setIdUP}
             //Handle
             handleChange = {this.handleChange}
             handleCategorys = {this.props.categorys}
             handleSubmitCreate= {this.handleSubmitCreate}
             handleSubmitDelete = {this.handleSubmitDelete}
             handleSubmitUpdate = {this.handleSubmitUpdate}
            />
           {/*  <Products products={this.props.products} /> */}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductsContainer);