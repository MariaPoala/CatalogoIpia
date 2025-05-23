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
  categoriasGeneral: string[] = [];
  mostrarDropdown = false;
  categoriaSeleccionada: string | null = null;
  categoriaSeleccionadaGeneral: string | null = null;
  filtroNombre: string = '';
  productosFiltrado: Producto[] = [];
  categoriasGlobales = ['Abarrotes', 'Pastelería', 'Higiene', 'Limpieza', 'Bebidas', 'Snacks'];


  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((data: Producto[]) => {
      this.productos = data;
      // const categorias = data.map((p) => p.CATEGORIA);

      const categoriageneral = data.map((p) => p.CATEGORIAGENERAL)
      this.categoriasGeneral = [...new Set(categoriageneral)];



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

  // seleccionarCategoriaGeneral(categoria: string | null) {
  //   this.categoriaSeleccionadaGeneral = categoria;
  //   console.log("selec " + this.categoriaSeleccionadaGeneral)
  //   this.filtroNombre = '';
  //   this.filtrarProductos();
  // }

  seleccionarCategoriaGeneral(categoria: string | null) {
    this.categoriaSeleccionadaGeneral = categoria;
    console.log("selec " + this.categoriaSeleccionadaGeneral);
    this.filtroNombre = '';

    // 👇 Este es tu código insertado correctamente
    const categorias = this.productos
      .filter((p) => p.CATEGORIAGENERAL === this.categoriaSeleccionadaGeneral)
      .map((p) => p.CATEGORIA);
    this.categoriasUnicas = [...new Set(categorias)];
    if (categoria == null) {
      const nulo = this.productos.map((p) => p.CATEGORIA)
      this.categoriasUnicas = [...new Set(this.productos.map((p) => p.CATEGORIA))];
    }
    console.log("CAT " + this.categoriaSeleccionadaGeneral);

    this.filtrarProductos();
  }
  mostrarSidebar = false;


  private timeout: any;

  filtrarProductos(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      let filtrados = this.productos;

      if (this.categoriaSeleccionada) {
        filtrados = filtrados.filter(p => p.CATEGORIA === this.categoriaSeleccionada);
      }
      if (this.categoriaSeleccionadaGeneral) {
        filtrados = filtrados.filter(p => p.CATEGORIAGENERAL === this.categoriaSeleccionadaGeneral);
      }


      const filtro = this.filtroNombre.toLowerCase().trim();
      if (filtro) {
        filtrados = filtrados.filter((p) =>
          p.DESCRIPCIÓN.toLowerCase().includes(filtro)
        );
      }
      this.productosFiltrado = filtrados;
    }, 20);


  }
  // onImgError(event: Event) {
  //   (event.target as HTMLImageElement).src = '../images/sinimagen.jpg';
  // }
  onImgError(event: any) {
    const fallback = '../images/sinimagen.jpg';

    // Evita bucle infinito si la imagen de respaldo tampoco existe
    if (!event.target.src.includes(fallback)) {
      event.target.src = fallback;
    } else {
      event.target.style.display = 'none'; // oculta completamente si nada carga
    }
  }

}
