const tableList = document.querySelector('#table-list').querySelector('tbody');

class Product{
    constructor(name,price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}


class UI
{
   static instancias = 0;
    
     addProduct(product){
        this.constructor.instancias +=1
        // console.log(instancias);
        console.log(this);
         //crear una fila
         let fila = document.createElement('tr');

         //crear la celda id
         let cellId = document.createElement('td');
         let cellIdText = document.createTextNode(this.constructor.instancias);
         cellId.appendChild(cellIdText);

          //crear la celda name
          let cellName = document.createElement('td');
          let cellNameText = document.createTextNode(product.name);
          cellName.appendChild(cellNameText);

         //crear la celda price
         let cellPrice = document.createElement('td');
         let cellPriceText = document.createTextNode(product.price);
         cellPrice.appendChild(cellPriceText);
 
         //crear la celda year
         let cellYear = document.createElement('td');
         let cellYearText = document.createTextNode(product.year);
         cellYear.appendChild(cellYearText);

         //crear la celda delete
         let cellDelete = document.createElement('td');
        //  cellDelete.className = "btn btn-danger"
         cellDelete.innerHTML = '<a class="btn btn-danger" name="delete">X</a>';
        //  cellDelete.appendChild(cellDeletetext);
 
         //append the cells to the row
         fila.appendChild(cellId)
         fila.appendChild(cellName)
         fila.appendChild(cellPrice)
         fila.appendChild(cellYear)
         fila.appendChild(cellDelete)
 
         tableList.appendChild(fila)

         this.resetForm();
     }

     deleteProduct(element){
        if(element.hasAttribute('name') && (element.getAttribute('name') === 'delete')){
            element.parentElement.parentElement.remove();
            //if there is 2 instances with id 1and 2,  and deleted the first row i.e(id 1), the next row will have an id of 2
            this.constructor.instancias -=1
            this.showMessage("Producto eliminado",'info')
        }
     }

     resetForm(){
        document.getElementById('form-product').reset();
     }

     showMessage(message, cssClass){
        const div = document.createElement('div')
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message))

        const container = document.querySelector('.main-container')
        const app = container.querySelector('.App')
        container.insertBefore(div,app)

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
     }
}


//Events

document.getElementById("form-product").addEventListener('submit', (e) => {
    e.preventDefault();
   const productName = document.querySelector('#name').value;
   const productPrice = parseFloat(document.querySelector('#price').value);
   const productYear = parseInt(document.querySelector('#year').value);

   const ui = new UI();
   if(productName == "" || productPrice == "" || productYear == ""){
        ui.showMessage("Por favor complete todos los campos",'danger')
        return;
   }
   let product = new Product(productName, productPrice, productYear);

   
    ui.addProduct(product);
    ui.showMessage("Producto agregado",'success')
})

tableList.addEventListener('click', (e) => {
    const ui = new UI();
    const element = e.target
    ui.deleteProduct(element);
    
})