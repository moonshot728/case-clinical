import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'libs/shared/shared.module';
import { chatRoutes } from 'libs/web/modules/admin/apps/chat/chat.routing';
import { ChatComponent } from 'libs/web/modules/admin/apps/chat/chat.component';
import { ChatsComponent } from 'libs/web/modules/admin/apps/chat/chats/chats.component';
import { ContactInfoComponent } from 'libs/web/modules/admin/apps/chat/contact-info/contact-info.component';
import { ConversationComponent } from 'libs/web/modules/admin/apps/chat/conversation/conversation.component';
import { NewChatComponent } from 'libs/web/modules/admin/apps/chat/new-chat/new-chat.component';
import { ProfileComponent } from 'libs/web/modules/admin/apps/chat/profile/profile.component';

@NgModule({
    declarations: [
        ChatComponent,
        ChatsComponent,
        ContactInfoComponent,
        ConversationComponent,
        NewChatComponent,
        ProfileComponent
    ],
    imports     : [
        RouterModule.forChild(chatRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatSidenavModule,
        SharedModule
    ]
})
export class ChatModule
{
}
