import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Annotation, NgxAnnotateTextComponent } from "ngx-annotate-text";
import { saveAs } from "file-saver";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'annotation-app';
  test:any;
  
  labelData: Array<any> = [];
  jsonData: Array<any> = [];
  profileForm = new FormGroup({
    label: new FormControl(''),
   
  });
  downloadJsonHref: any;
  constructor(private fb:FormBuilder,private sanitizer: DomSanitizer) {
    this.jsonData.push(this.text)
    this.profileForm = this.fb.group({
      label: [''],
      color:['']
    });
  }
  @ViewChild("annotateText") ngxAnnotateText?: NgxAnnotateTextComponent;

  text  =
    "I have read the information about the Bachelor in Computer Science & Engineering study programme with great interest on your website. Through this motivational letter, I would like to put forward my candidacy for enrolment in this course In May 2016, I have finished my high school diploma at the university of cape town in Italy and received the Diploma from the university of cape town. My diploma is mainly aimed at mathematics and the sciences. I have decided to take the most advanced courses in mathematics, chemistry and physics available in school in order to challenge myself and make sure that I will be as prepared as possible for your study programme. Even though I have been reluctant many times to follow this combination of courses, as it is regarded as having the largest workload, I have pushed through the past two years of school work and I have made it possible thanks to my passion, commitment and hard work in mathematics, chemistry and physics"
    
  annotations: Annotation[] = [

  ];
 
  
  addAnnotation(label: string, color: string): void {
    if (!this.ngxAnnotateText) {
      return;
    }

    const selection = this.ngxAnnotateText.getCurrentTextSelection();
    if (!selection) {
      return;
    }

    if (this.ngxAnnotateText.isOverlappingWithExistingAnnotations(selection)) {
      alert("The selected text is already annotated.");
      return;
    }

    this.annotations = this.annotations.concat(
      new Annotation(selection.startIndex, selection.endIndex, label, color)
    );

    this.jsonData.push(this.annotations)
   
    
  }
  onSubmit(){
  this.labelData.push(this.profileForm.value)
  }


exportTojson() {
  let exportData = this.jsonData;
  return saveAs(
    new Blob([JSON.stringify(exportData, null, 2)], { type: 'JSON' }), 'sample.json'
  );}

}
