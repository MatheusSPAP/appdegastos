import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ListaService } from '../services/lista-service';
import { Ilista } from '../../../models/ilista';

@Component({
  selector: 'app-form-lista',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-lista.html',
  styleUrl: './form-lista.css'
})
export class FormLista {

  form: FormGroup<{
    cpf: FormControl<string>;
    nome_lista: FormControl<string>;
    descricao_lista: FormControl<string>;
  }>;

  // Aceita CPF com pontuação (000.000.000-00) ou somente dígitos (11 dígitos).
  private cpfPattern = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;

  @Output() saved = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private service: ListaService) {
    this.form = this.fb.group({
      cpf: this.fb.control<string>('', {
        nonNullable: true,
        validators: [Validators.maxLength(14), Validators.pattern(this.cpfPattern)]
      }),
      nome_lista: this.fb.control<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)]
      }),
      descricao_lista: this.fb.control<string>('', {
        nonNullable: true,
        validators: [Validators.maxLength(255)]
      })
    });
  }


  onSubmit(): void {
    if (this.form.invalid) return;


    const payload: Ilista = {
      id_lista: -1,
      cpf: this.form.controls.cpf.value,
      nome_lista: this.form.controls.nome_lista.value.trim(),
      descricao_lista: this.form.controls.descricao_lista.value,
    };

    this.service.insert(payload).subscribe({
      next: () => {
        alert('Lista criada com sucesso!');
        this.reset();
        this.saved.emit();
      },
      error: (err) => {
        console.error('Erro ao salvar lista:', err);
        alert('Não foi possível salvar. Verifique a API e tente novamente.');
      }
    });
  }

  reset(): void {
    this.form.reset({
      cpf: '',
      nome_lista: '',
      descricao_lista: ''
    });
  }
}



