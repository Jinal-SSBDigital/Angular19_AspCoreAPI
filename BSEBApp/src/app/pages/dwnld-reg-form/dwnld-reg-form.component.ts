// dwnld-reg-form.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, GridColumn, DataAdapter } from '@smart-webcomponents-angular/grid';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dwnld-reg-form',
  templateUrl: './dwnld-reg-form.component.html',
  styleUrls: ['./dwnld-reg-form.component.css']
})
export class DwnldRegFormComponent implements OnInit {
  @ViewChild('grid', { static: false }) grid!: GridComponent;

  // Define the form
  form: FormGroup;

  // Data source for the grid (nullable until loaded)
  dataSource: DataAdapter | null = null;

  // Columns for the grid
  columns: GridColumn[] = [
    { label: 'Student Name', dataField: 'studentName', width: 250 },
    { label: 'Father Name', dataField: 'fatherName', width: 250 },
    { label: 'Mother Name', dataField: 'motherName', width: 250 },
    { label: 'Faculty', dataField: 'faculty', width: 250 },
    { label: 'College', dataField: 'college', width: 250 }
  ];

  // For Faculty and College Dropdown
  faculties: any[] = [];
  colleges: any[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      studentName: [''],
      college: [''],
      faculty: ['']
    });
  }

  ngOnInit(): void {
    this.loadFaculties();
    this.loadColleges();
  }

  // Load faculties from the API
  loadFaculties() {
    this.http.get('/api/dwnldregform/bindfaculty').subscribe((response: any) => {
      this.faculties = response.data || [];
    });
  }

  // Load colleges from the API
  loadColleges() {
    this.http.get('/api/dwnldregform/bindcolleges').subscribe((response: any) => {
      this.colleges = response.data || [];
    });
  }

  // Fetch and display records
  viewRecords() {
    const { studentName, faculty, college } = this.form.value;
    const apiUrl = '/api/dwnldregform/dwnldregform';

    this.http.post(apiUrl, { studentName, faculty, college }).subscribe((response: any) => {
      const rows = response.data || [];

      this.dataSource = new DataAdapter({
        dataSource: rows,
        dataFields: [
          { name: 'studentName', dataType: 'string' },
          { name: 'fatherName', dataType: 'string' },
          { name: 'motherName', dataType: 'string' },
          { name: 'faculty', dataType: 'string' },
          { name: 'college', dataType: 'string' }
        ]
      });
    });
  }
}
