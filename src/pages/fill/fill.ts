import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComplaintProvider } from '../../providers/complaint/complaint';
import { FileTransfer ,FileTransferObject,FileUploadOptions} from '@ionic-native/file-transfer/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {File} from '@ionic-native/file/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';

/**
 * Generated class for the FillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fill',
  templateUrl: 'fill.html',
})
export class FillPage {

  myRec = {
   type:'' ,
   project:'' ,
   description:'',

  }
  myFile={
    file:''
  }
  mood:any;
  project:any;
  uploadText:any;
  downloadText:any;
  fileTransfer:FileTransferObject;
  constructor(public navCtrl: NavController, public navParams: NavParams,public complaint: ComplaintProvider
    ,public transfer:FileTransfer,public file:File,public filePath:FilePath,public fileChooser:FileChooser) {
    this.complaint.Type().then((data)=>{
   //   console.log(JSON.stringify(data))
        this.mood=data["type"];
       })
       this.complaint.Project().then((data)=>{
     //   console.log(JSON.stringify(data))
          this.project=data["projects"];
         })
         this.uploadText="";
         this.downloadText="";
  }

  uploadFile(){
   this.fileChooser.open().then((uri)=>{
        this.filePath.resolveNativePath(uri).then((nativepath)=>{
          this.fileTransfer =this.transfer.create();
          let options:FileUploadOptions={
            fileKey:"pdf",
            fileName:"file.pdf",
            chunkedMode:false,
            headers:{},
            mimeType:'pdf'
          }
          this.uploadText ="uploading .....";
          this.fileTransfer.upload(nativepath,'url',options).then((data)=>{
            alert("transfer done="+JSON.stringify(data));
            this.uploadText="";

          },(err)=>{
            this.uploadText=""
          })
        },(err)=>{
          alert(JSON.stringify(err))
        })
   },(err)=>{
     alert(JSON.stringify(err));
  })
  }
  AbortUplaod(){
    this.fileTransfer.abort();
    alert("upload cancel.");
  }

  ionViewDidLoad() {
   console.log('ionViewDidLoad FillPage');
  }
  onFile(e){
    console.log(e.target.files[0]);
    this.myFile.file = e.target.files[0];
}
  add(){
    this.complaint.AddComplain(this.myRec,this.myFile).then((result)=>{
      console.log(result)
      this.navCtrl.pop()
    },(err)=>{
      console.log("insert err: "+ err)
      console.log("this.myInfo: "+ JSON.stringify(this.myRec))
    })
   }
}
