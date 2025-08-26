import { TestBed } from '@angular/core/testing';
import { App } from './app';

// Unit tests for the root application component.
// These tests verify basic instantiation and rendering behavior only.
describe('App', () => {
  beforeEach(async () => {
    // Configure a testing module that imports the standalone App component.
    // NOTE: This keeps the test lightweight and focused on the component itself.
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    // Basic smoke test: component instance should be created.
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    // Render the component and assert the visible title text.
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('TicTacToe');
  });
});
