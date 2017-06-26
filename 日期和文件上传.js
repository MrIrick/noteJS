Date picker
时间控件
const callback = (start, end) => {
  $('.date-input span').html(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
  this.startDate = start.format('YYYY-MM-DD'); // todo修改时间格式
  this.endDate = end.format('YYYY-MM-DD');
}
callback(moment().subtract(6, 'days'), moment());
$('.date-input').daterangepicker({
  // timePicker: true,
  // timePickerIncrement: 30,
  applyClass: 'btn-primary',
  startDate: moment().subtract(6, 'days'),
  endDate: moment(),
  ranges: {
    "昨天": [moment().subtract(1, "days"), moment()],
    "最近三天": [moment().subtract(3, "days"), moment()],
    "最近一周": [moment().subtract(7, "days"), moment()],
    "最近30天": [moment().subtract(29, "days"), moment()]
  },
  locale: {
    format: "YYYY/MM/DD",
    applyLabel: "应用",
    cancelLabel: "取消",
    fromLabel: "从",
    toLabel: "到",
    customRangeLabel: "定制",
    daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    firstDay: 1
  }
}, callback);

文件上传fileupload

uploadHandle: function(type, $target, $btn) {
  $target.off('fileuploaddone');
  $target.fileupload({
    url:URLS.IMG_UPLOAD,
    dataType:'json',
    acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
      maxFileSize: 5000000,
      messages:{
        acceptFileTypes: '只能上传jpg或者png格式的图片',
            maxFileSize: '文件大小不能超过5MB'
      }
    })
    .on('fileuploadprocessalways',(e,data) => {
      const index = data.index;
      const file = data.files[index];
      if(file.error){
        banma.ui.toast.warning(file.error)
        return; 
      }
      $btn.html('上传中...').prop('disabled', true);
    })
    .on('fileuploaddone', (e,r) => {
      const data = r.jqXHR.responseJSON;
      $btn.html('上传附件').prop('disabled', false);
      if(!data.code){
        if(data.data[0].url){
          this[type].valObj.imgUrls.push(data.data[0].url);
          this[type].validTips.img = '';
        }else{
          banma.ui.toast.warning('请上传jpg或png格式的图片！');
        }
      }else{
        banma.ui.toast.warning(data.msg);
      }
    })
    .on('fileuploadfail', () => {
      $btn.html('上传附件').prop('disabled', false);
      banma.ui.toast.warning('上传失败，请重试');
    })
}
