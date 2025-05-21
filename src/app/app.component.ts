import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Producto, ProductoService } from './servicios/producto.service';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, HttpClientModule, FooterComponent, NgIf, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'catalogo-productos';
  productos: Producto[] = [];
  categoriasUnicas: string[] = [];
  mostrarDropdown = false;
  categoriaSeleccionada: string | null = null;
  filtroNombre: string = '';
  productosFiltrado: Producto[] = [];


  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((data: Producto[]) => {
      this.productos = data;
      const categorias = data.map((p) => p.CATEGORIA);
      this.categoriasUnicas = [...new Set(categorias)];
      this.filtrarProductos(); // Aplica filtro inicial
    });
  }
  seleccionarYCerrarDropdown(categoria: string | null) {
    this.seleccionarCategoria(categoria);
    this.mostrarDropdown = false;
    this.filtrarProductos();
  }

  seleccionarCategoria(categoria: string | null) {
    this.categoriaSeleccionada = categoria;
    this.filtroNombre = '';
    this.filtrarProductos();
  }


  private timeout: any;

  filtrarProductos(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      let filtrados = this.productos;

      if (this.categoriaSeleccionada) {
        filtrados = filtrados.filter(p => p.CATEGORIA === this.categoriaSeleccionada);
      }

      const filtro = this.filtroNombre.toLowerCase().trim();
      if (filtro) {
        filtrados = filtrados.filter((p) =>
          p.DESCRIPCIÓN.toLowerCase().includes(filtro)
        );
      }
      this.productosFiltrado = filtrados;
    }, 20); // Espera 200 ms antes de aplicar el filtro
  }
  // // Método para asignar la categoría seleccionada (por ejemplo, al hacer click en una categoría)
  // seleccionarCategoria(categoria: string | null) {
  //   this.categoriaSeleccionada = categoria;
  // }

  // // // Getter para filtrar productos según la categoría seleccionada
  // // get productosFiltrados(): Producto[] {
  // //   if (!this.categoriaSeleccionada) {
  // //     return this.productos; // si no hay categoría, muestra todos
  // //   }
  // //   return this.productos.filter((p) => p.CATEGORIA === this.categoriaSeleccionada);
  // // }



  // filtrarPorNombre(): void {
  //   const filtro = this.filtroNombre.toLowerCase().trim();

  //   if (!filtro) {
  //     this.productosFiltrado = [...this.productos];
  //   } else {
  //     this.productosFiltrado = this.productos.filter((p) =>
  //       p.DESCRIPCIÓN.toLowerCase().includes(filtro)
  //     );
  //   }
  //   console.log("nombre" + this.productosFiltrado)
  // }

  // get productosFiltrados(): Producto[] {
  //   let filtrados = this.productos;

  //   // Filtrar por categoría si hay una seleccionada
  //   if (this.categoriaSeleccionada) {
  //     filtrados = filtrados.filter((p) => p.CATEGORIA === this.categoriaSeleccionada);
  //   }

  //   // Filtrar por nombre si hay texto ingresado
  //   const filtro = this.filtroNombre.toLowerCase().trim();
  //   if (filtro) {
  //     filtrados = filtrados.filter((p) =>
  //       p.DESCRIPCIÓN.toLowerCase().includes(filtro)
  //     );
  //   }

  //   return filtrados;
  // }

}
