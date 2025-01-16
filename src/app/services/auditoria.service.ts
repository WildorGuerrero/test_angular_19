// src/app/services/auditoria.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuditoriaService {
  private baseUrl = 'http://38.242.207.230/API-AUDITORIA/api/Auditoria';

  constructor(private http: HttpClient) {}

  // Obtener datos
  getAuditorias(consecutivo: number, usuario: number): Observable<any> {
    const url = `${this.baseUrl}/GetListAuditoriasXEmpresa?consecutivo=${consecutivo}&usuario=${usuario}&{}`;
    return this.http.get<any>(url);
  }

  // Agregar auditoría
  saveAuditoria(data: any): Observable<any> {
    const url = `${this.baseUrl}/SaveAuditoria`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, data, { headers });
  }
}
