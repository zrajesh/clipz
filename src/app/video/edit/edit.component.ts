import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IClip from 'src/app/models/clip.model';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null;
  clipID = new FormControl('')
  inSubmission = false;
  showAlert = false;
  alertColor = "blue";
  alertMsg = "Please wait! Updating clip";
  @Output() update = new EventEmitter();

  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });

  editForm = new FormGroup({
    title: this.title,
    id: this.clipID
  });

  constructor(
    private modal: ModalService,
    private clipService: ClipService
  ) { }

  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.activeClip) {
      return
    }
    this.inSubmission = false;
    this.showAlert = false;
    this.clipID.setValue(this.activeClip.docID)
    this.title.setValue(this.activeClip.title)
  }

  async submit() {
    if(!this.activeClip) {
      return
    }

    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = "blue";
    this.alertMsg = "Please wait! Updating clip";

    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value)
    } catch (error) {
      this.inSubmission = false;
      this.alertColor = "red";
      this.alertMsg = "Something went wrong. Try again later"
      return
    }
    this.activeClip.title = this.title.value;
    this.update.emit(this.activeClip);
    this.inSubmission = false;
    this.alertColor = "green";
    this.alertMsg = "Success!";
  }

}
