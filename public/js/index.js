/**
 *  @xin chou 
 * Create on: 2017-08-14
 */

var formApp = new Vue({
    el: '#form',
    data: {
        wordCond: 1,
        name: 'hua',
        age: '18',
        sex: 'female',
        school: 'scnu',
        list: [],
        isAdd: false,// 是否显示输入框
        conAdd: true,// 修改后的确认
        modIndex: 0,// 修改索引
    },
    methods: {
        addNew: function () {
            this.isAdd = true;
            this.conAdd= true;
            return;
        },
        modify: function (index) {
            var curItem = this.list[index];
            this.name = curItem.name;
            this.sex = curItem.sex;
            this.age = curItem.age;
            this.school = curItem.school;
            this.isAdd = true;
            this.conAdd=false;
            
            this.modIndex = index;
        },
        modConfirm: function () {
            // POST更新数据
            this.$http.post('/modify',{
                id: this.list[this.modIndex].id,
                name: this.name,
                sex: this.sex,
                age: this.age,
                school: this.school
            }).then(function(res){
                console.log(res.statusText);
                var curIt = this.list[this.modIndex];
                var usrRsp = res.body;

                curIt.name = usrRsp.name;
                curIt.age = usrRsp.age;
                curIt.sex = usrRsp.sex;
                curIt.school = usrRsp.school;
                this.isAdd = false;
            },function(err){
                console.log('更新失败'+err);
            });
        },
        toggleConfirm: function (conAdd) {
            conAdd = !conAdd;
        },
        del: function (index) {
            // POST删除数据
            this.$http.post('/delete',{
                   id: this.list[index].id,
            }).then(function(res){ 
                this.list.splice(index,1); 
                // console.log(res.bodyText);
            },function(err){
                alert('删除失败'+err);
            });
        },
        confirm: function () {
            if (!this.name || !this.sex || !this.age || !this.school ) {
                alert('输入不完整，请重新输入');
                return false;
            }
            // POST保存数据
            this.$http.post('/saveUser',{
                    name: this.name,
                    sex: this.sex,
                    age: this.age,
                    school: this.school
            }).then(function(res){
                this.list.push({
                    name: res.body.name,
                    sex: res.body.sex,
                    age: res.body.age,
                    school: res.body.school,
                    id: res.body._id,
                })    
                // console.log(this.list);
            },function(err){
                alert('保存失败'+err);
            });
            this.name = '';
            this.sex = '';
            this.age = '';
            this.school = '';
            this.isAdd = false;// 隐藏输入框标志
            var self = this;
        },
        cancel: function () {
            this.isAdd = false;
            return;
        },
    },
})


   

