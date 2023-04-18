import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class SwalFireService {
  constructor() {}

  questionBeforeDelete(): Promise<any> {
    return Swal.fire({
      title: 'Estás seguro?',
      text: 'Estos cambios no se podrán revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar!',
    });
  }

  messageDelete(): Promise<any> {
    return Swal.fire(
      'Borrado exitosamente',
      `Los datos han sido eliminados`,
      'success'
    );
  }

  formularyNotValid(): Promise<any> {
    return Swal.fire({
      title:
        'Este formulario no es válido, asegurate de haber llenado todos los campos',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }

  noDetectChangesForm(): Promise<any> {
    return Swal.fire({
      title: 'No se detectaron cambios en el formulario',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }

  changeEditSuccess(): Promise<any> {
    return Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'El cambio fue editado correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  changeAddSuccess(): Promise<any> {
    return Swal.fire(
      'Agregado exitosamente',
      'La sección fue añadida correctamente',
      'success'
    );
  }

  errorMessage(message: any): Promise<any> {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }
}
