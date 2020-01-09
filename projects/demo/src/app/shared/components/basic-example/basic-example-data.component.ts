import { Component } from '@angular/core';
import { LinkEditorComponent } from '../link-editor/link-editor.component';
import { NestedEditorComponent } from '../nested-editor/nested-editor.component';
import { RawEditorComponent } from '../raw-editor/raw-editor.component';
import { NestedRenderComponent } from '../nested-editor/nested-render.component';
import { NumericComponentDynamic } from '../numeric-editor/numeric-editor.component';


@Component({
  selector: 'basic-example-data',
  template: `
    <ng2-smart-table [settings]="settings" [source]="data"></ng2-smart-table>
  `,
})
export class BasicExampleDataComponent {

  settings = {
    attr: {
      class: 'smarty-table',
    },
    columns: {
      id: {
        title: 'ID',
        editor: {type: 'custom', component: NumericComponentDynamic}
      },
      name: {
        title: 'Full Name',
      },
      username: {
        title: 'User Name',
      },
      email: {
        title: 'Email',
      },
      raw: {
        title: 'Raw',
        editor: {
          type: 'custom',
          component: RawEditorComponent,
        },
      },
      labels: {
        title: 'Labels',
        type: 'custom',
        renderComponent: NestedRenderComponent,
        editor: {
          type: 'custom',
          component: NestedEditorComponent,
					columns: {
						foo: {
							title: 'foo'
						},
						bar: {
							title: 'bar'
            }
          }
        },
      },
      link: {
        title: 'Link',
        type: 'html',
        editor: {
          type: 'custom',
          component: LinkEditorComponent,
        },
      },
    },
  };

  data = [
    {
      id: 1,
      name: 'Leanne Graham8',
      username: 'Bret',
      email: 'Sincere@april.biz',
      raw: [42, 12],
      labels: [{id: 'foo'}, {id: 'bar', title: 'bogus', animal: 'dog', address: '1234 Sunnyside Rd'}],
      link: '<a href="https://github.com/akveo/blur-admin">Blur Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz',
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me',
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io',
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz',
    },
    {
      id: 11,
      name: 'Nicholas DuBuque',
      username: 'Nicholas.Stanton',
      email: 'Rey.Padberg@rosamond.biz',
    },
  ];
}
