import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = environment.imageApiUrl;

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload/`, formData);
  }

  getImages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/images/`);
  }

  getImageById(fileId: string): string {
    return `${this.apiUrl}/files/${fileId}`;
  }

  deleteImage(fileId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/files/${fileId}`);
  }
}
