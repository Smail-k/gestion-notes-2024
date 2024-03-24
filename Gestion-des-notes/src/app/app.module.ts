
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './login/login.component';
import { IsSignedGuard } from './guards/is-signed.guard';
import { RattrapageDialogContentComponent } from './material-component/rattrapage/rattrapage.component';
import { AuthinterceptorInterceptor } from './Interceptor/authinterceptor.interceptor';
import {DataTablesModule} from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        AppComponent,
        FullComponent,
        SpinnerComponent,
        AppSidebarComponent,
        RattrapageDialogContentComponent,
        LoginComponent,
    ],
    providers: [
        IsSignedGuard,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
        { provide: HTTP_INTERCEPTORS, useClass: AuthinterceptorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        DemoMaterialModule,
        FlexLayoutModule,
        HttpClientModule,
        FormsModule,
        SharedModule,
        ToastrModule.forRoot({
            timeOut : 3600,
            progressBar : true,
            progressAnimation: 'increasing'}),
        DataTablesModule,
        DataTablesModule.forRoot(),
        RouterModule.forRoot(AppRoutes),
        FontAwesomeModule,

    ]
})
export class AppModule {}
