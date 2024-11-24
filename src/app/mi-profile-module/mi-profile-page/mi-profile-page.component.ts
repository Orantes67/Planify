import { Component, OnInit } from '@angular/core';
import { UserI } from '../../credentials/interfaces/user-i';
import { ProfileServiceService } from '../services/profile-service.service';
import { ImageService } from '../../services/image.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-mi-profile-page',
  templateUrl: './mi-profile-page.component.html',
  styleUrls: ['./mi-profile-page.component.css'],
})
export class MiProfilePageComponent implements OnInit {
  user: UserI = {
    nombre: '',
    apellido_pat: '',
    apellido_mat: '',
    correo: '',
    familia_id: 0,
    contrasena: '',
    imageid: '',
    roles: [],
  };
  editing: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private profileService: ProfileServiceService,
    public imageService: ImageService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    const userAtStorage: UserI = this.storageService.obtenerUsuario();
    if (userAtStorage.usuario_id)
      this.profileService
        .getUser(userAtStorage.usuario_id)
        .subscribe((user) => (this.user = user));

    console.log(this.user);
  }

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  updateUser(): void {
    if (this.selectedFile) {
      // Subir la imagen y actualizar el usuario
      this.imageService.uploadImage(this.selectedFile).subscribe((response) => {
        if (response.file_id) {
          this.user.imageid = response.file_id;
          this.profileService.updateUser(this.user).subscribe(() => {
            this.editing = false;
            alert('Usuario actualizado exitosamente');
          });
        }
      });
    } else {
      // Actualizar solo datos del usuario
      this.profileService.updateUser(this.user).subscribe(() => {
        this.editing = false;
        alert('Usuario actualizado exitosamente');
      });
    }
  }
}
