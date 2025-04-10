import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextInputComponent } from './text-input.component';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-text-input
      [control]="control"
      [label]="'E-mail'"
      [placeholder]="'Wpisz e-mail'"
      [type]="'email'"
    ></app-text-input>
  `,
  standalone: true,
  imports: [TextInputComponent],
})
class TestHostComponent {
  control = new FormControl('', [Validators.required]);
}

describe('TextInputComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render label and placeholder correctly', () => {
    const label = fixture.nativeElement.querySelector('.label-text');
    const input = fixture.nativeElement.querySelector('input');

    expect(label.textContent).toContain('E-mail');
    expect(input.placeholder).toBe('Wpisz e-mail');
    expect(input.type).toBe('email');
  });

  it('should not show errors initially', () => {
    const errors = fixture.debugElement.query(By.css('.error-messages'));
    expect(errors).toBeNull();
  });

  it('should show "Pole jest wymagane" when required and touched', () => {
    hostComponent.control.markAsTouched();
    hostComponent.control.updateValueAndValidity();
    fixture.detectChanges();

    const errorText =
      fixture.nativeElement.querySelector('.error-messages li')?.textContent;
    expect(errorText).toContain('Pole jest wymagane');
  });

  it('should show custom email error message when invalidEmailPattern is present', () => {
    hostComponent.control.setErrors({
      invalidEmailPattern: 'Nieprawidłowy adres e-mail',
    });
    hostComponent.control.markAsTouched();
    fixture.detectChanges();

    const errorText =
      fixture.nativeElement.querySelector('.error-messages li')?.textContent;
    expect(errorText).toContain('Nieprawidłowy adres e-mail');
  });

  it('should not show error if field is valid', () => {
    hostComponent.control.setValue('test@example.com');
    hostComponent.control.markAsTouched();
    fixture.detectChanges();

    const errorMessages = fixture.debugElement.query(By.css('.error-messages'));
    expect(errorMessages).toBeNull();
  });
});
