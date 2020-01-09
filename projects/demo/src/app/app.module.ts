import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { PagesModule } from './pages/pages.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { ScrollPositionDirective } from './theme/directives/scrollPosition.directive';
import { NestedEditorComponent } from './shared/components/nested-editor/nested-editor.component';
import { LinkEditorComponent } from './shared/components/link-editor/link-editor.component';
import { RawEditorComponent } from './shared/components/raw-editor/raw-editor.component';
import { NestedRenderComponent } from './shared/components/nested-editor/nested-render.component';
import { NumericComponentDynamic } from './shared/components/numeric-editor/numeric-editor.component';
@NgModule({
  declarations: [
    AppComponent,
    ScrollPositionDirective,
    NestedEditorComponent,
    LinkEditorComponent,
    RawEditorComponent,
    NestedRenderComponent,
    NumericComponentDynamic
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    Ng2SmartTableModule,
    PagesModule,
  ],
  providers: [],
  entryComponents: [
    NestedEditorComponent,
    LinkEditorComponent,
    RawEditorComponent,
    NestedRenderComponent,
    NumericComponentDynamic
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
