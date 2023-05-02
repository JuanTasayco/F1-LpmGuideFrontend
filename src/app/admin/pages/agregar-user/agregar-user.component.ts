import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';
import { User } from '../../interfaces/user-interface';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { SwalFireService } from '../../services/swal-fire.service';

@Component({
  selector: 'app-agregar-user',
  templateUrl: './agregar-user.component.html',
})
export class AgregarUserComponent implements OnInit {
  users: User[] = [];
  usersFilter: User[] = [];
  menuVisible: boolean = false;
  @ViewChild('menuV') menu!: ElementRef;

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((dataUsers) => {
      this.users = dataUsers;
      this.usersFilter = dataUsers;
    });

    this.textDebounceOb.pipe(debounceTime(200)).subscribe((valueTextUser) => {
      let valueTextUserLower = valueTextUser.toLocaleLowerCase();

      this.usersFilter = this.users.filter(
        (users) =>
          users.nombre.toLocaleLowerCase().startsWith(valueTextUserLower) ||
          users.apellido.toLocaleLowerCase().startsWith(valueTextUserLower)
      );
    });
  }

  textDebounceOb: Subject<string> = new Subject<string>();
  getText(event: any) {
    this.menuVisible = true;
    const text = event.target.value;
    this.textDebounceOb.next(text);
  }

  prueba(id: string = '') {
    this.menuVisible = false;
    this.usersFilter = this.users.filter((user) => user.id == id);
  }

  goToEditPerfil(id: string) {
    this.route.navigate(['/admin/usuarios', id]);
  }

  @HostListener('document:click', ['$event'])
  onClickOutMenuVisible(event: MouseEvent) {
    const target = event.target;
    if (this.menuVisible == true) {
      this.menuVisible = false;
    }
  }

  getUserClass(user: User) {
    if (user.isActive) {
      return 'text-success';
    } else {
      return 'text-danger';
    }
  }
  /* sendInfoForUpdate */
  deleteUser(id: string) {
    this.swalService.questionBeforeDelete().then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe((resp) => {
          if (resp) {
            this.swalService.messageDelete();
            location.reload();
          } else {
            this.swalService.messageNotDelete();
          }
        });
      }
    });
  }

  constructor(
    private userService: UserService,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private swalService: SwalFireService,
    private formBuilder: FormBuilder,
    private detectorRef: ChangeDetectorRef
  ) {}
}
