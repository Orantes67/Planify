import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EventI } from '../interfaces/event-i';
import { EventCreateOrUpdateI } from '../interfaces/event-create-or-update-i';
import { EventsService } from '../services/events-service.service';

@Component({
  selector: 'app-events-dashboard',
  templateUrl: './events-dashboard.component.html',
})
export class EventsDashboardComponent implements OnChanges {
  @Input() familyId: number | null | undefined = null;
  @Input() userRole: 'lider' | 'miembro' | undefined;
  events: EventI[] = [];
  newEvent: EventCreateOrUpdateI = {
    nombre: '',
    fecha_inicio: '',
    fecha_fin: '',
    familia_id: 0,
  };

  isEditModalOpen = false;
  isDeleteModalOpen = false;
  selectedEvent: EventI | null = null;
  deleteEventId: number | null = null;

  constructor(private eventsService: EventsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['familyId'] && changes['familyId'].currentValue) {
      this.loadEvents();
    }
  }

  loadEvents(): void {
    if (!this.familyId) return;
    this.eventsService.getEventsByFamilyId(this.familyId).subscribe({
      next: (data) => (this.events = data),
      error: (err) => console.error('Error loading events:', err),
    });
  }

  createEvent(): void {
    if (!this.familyId) return;
    this.newEvent.familia_id = this.familyId;
    this.eventsService.createEvent(this.newEvent).subscribe({
      next: (event) => {
        this.events.push(event);
        this.resetNewEvent();
      },
      error: (err) => console.error('Error creating event:', err),
    });
  }

  openEditModal(event: EventI): void {
    this.selectedEvent = { ...event }; // Clonar el evento seleccionado
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedEvent = null;
  }

  updateEvent(): void {
    if (!this.selectedEvent) return;
    const { evento_id, ...eventData } = this.selectedEvent;
    this.eventsService.updateEvent(evento_id!, eventData).subscribe({
      next: () => {
        this.loadEvents();
        this.closeEditModal();
      },
      error: (err) => console.error('Error updating event:', err),
    });
  }

  openDeleteModal(eventId: number): void {
    this.deleteEventId = eventId;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.deleteEventId = null;
  }

  confirmDeleteEvent(): void {
    if (!this.deleteEventId) return;
    this.eventsService.deleteEvent(this.deleteEventId).subscribe({
      next: () => {
        this.events = this.events.filter(
          (event) => event.evento_id !== this.deleteEventId
        );
        this.closeDeleteModal();
      },
      error: (err) => console.error('Error deleting event:', err),
    });
  }

  resetNewEvent(): void {
    this.newEvent = {
      nombre: '',
      fecha_inicio: '',
      fecha_fin: '',
      familia_id: 0,
    };
  }
}
