<template>
	<div class="userInfo">
		<el-form label-width="5em">
			<el-form-item label="用户名" class="half">{{userInfo.USERNAME}}</el-form-item>
			<el-form-item label="姓名" class="half">{{userInfo.CARDNAME}}</el-form-item>
			<el-form-item label="角色" class="half">{{userInfo.USERROLENAME}}</el-form-item>
			<el-form-item label="性别" class="half">{{userInfo.SEXNAME}}</el-form-item>		
			<el-form-item label="生日" class="half">{{userInfo.BIRTHDAY}}</el-form-item>
			<el-form-item label="邮箱" class="half">{{userInfo.EMAIL}}</el-form-item>
			<el-form-item label="地址" class="half">{{userInfo.ADDRESS}}</el-form-item>
			<el-form-item label="籍贯" class="half">{{userInfo.NATIVEPLACE}}</el-form-item>
			<el-form-item label="身份证" class="half">{{userInfo.IDCARD}}</el-form-item>
			<el-form-item label="联系电话" class="half">{{userInfo.TEL}}</el-form-item>
			<el-form-item label="单位" class="half">{{userInfo.COMPANY}}</el-form-item>
		</el-form>
	<el-button type="primary" style="margin-top:50px;margin-right:100px;float:right" @click="ShowUpdateUserPassword">修改密码</el-button>
		<el-dialog title="修改密码" append-to-body :visible.sync="dialogFormVisible" width="600px" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form :model="registerForm"  :rules="rules" ref="registerForm"  label-width="140px" size="small" >
						<el-form-item label="旧密码" prop="OLDPASSWORD">
					<el-input v-model="registerForm.OLDPASSWORD" autocomplete="off" type="password" placeholder="请输入旧密码"></el-input>
				</el-form-item>
						<el-form-item label="新密码" prop="PASSWORD">
					<el-input v-model="registerForm.PASSWORD" autocomplete="off" @focus="hidePWDCK=false" @keyup.native="checkPWD" @blur="hidePWDCK=true" type="password" placeholder="请输入新密码"></el-input>
					<div class="pwdCheck" v-if="!hidePWDCK">
						<i :class="{orange:pwdGrade>=1}"></i>
						<i :class="{yellow:pwdGrade>=3}"></i>
						<i :class="{green:pwdGrade>=4}"></i> {{pwdCheckword}}
					</div>
				</el-form-item>
				<el-form-item label="确认密码" prop="REPASSWORD">
					<el-input v-model="registerForm.REPASSWORD" type="password" placeholder="请输入确认密码"></el-input>

				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
				<el-button type="primary" @click="UpdateUserPassword()" size="small">确 定</el-button>
			</div>
		</el-dialog>			
	</div>	
</template>

<script>
	export default{
		data(){
	var validatePass0 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入旧密码!'));
				} else {
					var pp = /^(\w){1,20}$/;
					if(!pp.test(value)) {
						callback(new Error('密码不合法，请英文字母、数字或下划线'));
					}
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入新密码!'));
				} else {
					var pp = /^(\w){1,20}$/;
					if(!pp.test(value)) {
						callback(new Error('密码不合法，请英文字母、数字或下划线'));
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码!'));
				} else if(value !== this.registerForm.PASSWORD) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return{
				userInfo:{},
					registerForm: {
					OLDPASSWORD:"",
					PASSWORD: "",	
					REPASSWORD: "",	
				},
				rules: {	
					OLDPASSWORD: [{
							required: true,
							message: '请输入旧密码',
							trigger: 'blur'
						},						
					],			
					PASSWORD: [{
							required: true,
							message: '请输入新密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 20,
							message: '长度在 6 到 20 个字符',
							trigger: 'blur'
						},
						{
							validator: validatePass,
							trigger: ['blur', 'change']
						}
					],
					REPASSWORD: [{
						validator: validatePass2,
						trigger: ['blur', 'change']
					}],			

				},	
				pwdGrade: 0,
				pwdCheckword: "",
					hidePWDCK: true,
					dialogFormVisible:false,
			}
		},
		methods:{
			ShowUpdateUserPassword() {	
				this.registerForm.PASSWORD="";
				this.registerForm.REPASSWORD="";
				this.registerForm.OLDPASSWORD="";
				this.dialogFormVisible = true;
				this.$refs["registerForm"].resetFields();
	},
	UpdateUserPassword() {
				this.$refs['registerForm'].validate((valid) => {
					if(valid) {					
							this.$fetch("/UserDepartmentRoleWS.asmx/UpdateUserPassword", {
								KEYID: this.userInfo.USERID,							
								PASSWORD: this.registerForm.PASSWORD,
									OLDPASSWORD: this.registerForm.OLDPASSWORD,
							}).then(res => {
								if(res.code==20000){
									this.$message({
										message: '修改成功',
										type: 'success'
									});
									this.exit()
								}else{
									this.$message({
										message: res.message,
										type: 'error'
									});
								}								
							})						
					}
				})
			},
					exit() {
				localStorage.setItem("userInfo", "");
				localStorage.setItem("token", "");
				this.istoken = false;
				this.user = {};
				this.$router.push("/login");
			},
	checkPWD(el) {
				this.hidePWDCK = false;
				var value = this.registerForm.PASSWORD;
				var level = 0,
					arr = ["", "低", "低", "中", "高", "高"];
				if(/[1-9]/.test(value)) {
					level++;
				}
				if(/[a-z]/.test(value)) {
					level++;
				}
				if(/[A-Z]/.test(value)) {
					level++;
				}
				var l = value.toString().split('_');
				if(l.length > 1) {
					level++
				}

				//		        if (value.length < 6) {
				//		            level = 0;
				//		        }
				this.pwdCheckword = arr[level];
				this.pwdGrade = level;

			},
		},
		mounted(){
			this.userInfo=JSON.parse(localStorage.getItem('userInfo'))
			document.getElementById("target").scrollIntoView();
		}
	}
</script>

<style>
	.userInfo{
		padding: 20px;
		color: #333;
	}
	.userInfo .el-form-item__label{
		color: #999;
	}
	 .el-form-item.half{
	 	width: 50%;
	 	display: inline-block;
	 	margin-left: -4px;
	 }
	.register {
		width: 800px;
		margin: 0 auto;
		margin-top: 50px;
		border: 1px solid #cccccc;
		padding-bottom: 80px;
		margin-bottom: 50px;
	}
	
	.register_title {
		font-size: 24px;
		color: #666666;
		padding-left: 20px;
		margin-top: 20px;
	}
	
	.register_title span {
		color: #d2d2d2;
	}
	
	.register_form {
		margin: 0 auto;
		margin-top: 50px;
		width: 500px;
	}
	</style>

<style scoped="scoped" lang="less">
		.pwdCheck {
		i {
			display: inline-block;
			border-radius: 5px;
			height: 10px;
			width: 50px;
			vertical-align: middle;
			margin-right: 5px;
			background: #F0F0F0;
		}
		.orange {
			background: #FFB608;
		}
		.yellow {
			background: yellow;
		}
		.green {
			background: green;
		}
	}
</style>