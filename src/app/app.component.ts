import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuditoriaService } from './services/auditoria.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'test_angular';
  auditorias: any[] = [];
  newAuditoria = {
    consecutivO_EMPRESA: 999,
    nombre: '',
    usuariO_CREACION: 1000,
    usuariO_MODIFICACION: 1000,
  };

  constructor(private auditoriaService: AuditoriaService) {}

  ngOnInit(): void {
    this.loadAuditorias();
  }

  // Cargar auditorías
  loadAuditorias(): void {
    this.auditoriaService.getAuditorias(999, 1000).subscribe(
      (response) => {
        this.auditorias = response.datos;
      },
      (error) => {
        console.error('Error al cargar auditorías:', error);
      }
    );
  }

  // Agregar nueva auditoría
  addAuditoria(): void {
    if (!this.newAuditoria.nombre) {
      alert('El campo "nombre" es obligatorio.');
      return;
    }

    this.auditoriaService.saveAuditoria(this.newAuditoria).subscribe(
      (response) => {
        alert('Auditoría agregada exitosamente.');
        this.newAuditoria.nombre = ''; // Limpiar el campo
        this.loadAuditorias(); // Recargar los datos
      },
      (error) => {
        console.error('Error al guardar auditoría:', error);
        alert('Hubo un error al guardar la auditoría.');
      }
    );
  }
}
