<template>
	<div>
		<div class='register'>
			<div class="register_title">
				用户注册 <span>REGISTERED MEMBERS</span>
			</div>
			<el-form :model="registerForm" :rules="rules" ref="registerForm" class="register_form" label-width="80px">
				<el-form-item label="用户名" prop="NAME">
					<el-input v-model="registerForm.NAME" autocomplete="off" type="text" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="PASSWORD">
					<el-input v-model="registerForm.PASSWORD" autocomplete="off" @focus="hidePWDCK=false" @keyup.native="checkPWD" @blur="hidePWDCK=true" type="password" placeholder="请输入密码"></el-input>
					<div class="pwdCheck" v-if="!hidePWDCK">
						<i :class="{orange:pwdGrade>=1}"></i>
						<i :class="{yellow:pwdGrade>=3}"></i>
						<i :class="{green:pwdGrade>=4}"></i> {{pwdCheckword}}
					</div>
				</el-form-item>
				<el-form-item label="确认密码" prop="REPASSWORD">
					<el-input v-model="registerForm.REPASSWORD" type="password" placeholder="请输入确认密码"></el-input>

				</el-form-item>
				<el-form-item label="姓名" prop="CARDNAME">
					<el-input v-model="registerForm.CARDNAME" type="text" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="EMAIL">
					<el-input v-model="registerForm.EMAIL" type="text" placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-select v-model="registerForm.SEX" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker v-model="registerForm.BIRTHDAY" type="date" style="width: 100%;" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="籍贯">
					<el-input v-model="registerForm.NATIVEPLACE" type="text" placeholder="请输入籍贯"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="registerForm.ADDRESS" type="text" placeholder="请输入地址"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop='TEL'>
					<el-input v-model="registerForm.TEL" type="text" placeholder="请输入联系电话"></el-input>
				</el-form-item>
				<el-form-item label="身份证" prop='IDCARD'>
					<el-input v-model="registerForm.IDCARD" type="text" placeholder="请输入身份证"></el-input>
				</el-form-item>
				<el-form-item label="单位">
					<el-input v-model="registerForm.COMPANY" type="text" placeholder="请输入单位"></el-input>
				</el-form-item>
				<el-form-item>
					<el-checkbox v-model="checked">同意</el-checkbox><span style="color: #409eff;cursor:pointer" @click="dialogTableVisible=true">"服务条款"</span>和<span style="color: orange;cursor:pointer" @click="dialogTableVisible=true">"隐私权政策"</span>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="large" @click="register('registerForm')" style="width:420px">注册</el-button>
				</el-form-item>
			</el-form>
			<el-dialog title="同意服务条款和隐私权相关政策" :visible.sync="dialogTableVisible" center width="1000px">
				<el-scrollbar style="height: 600px;" class="myscrollbar">
					<pre class="htmledit_views">
						<h1>1. 接受条款</h1>
		欢迎光临成都天府新区地理信息公共平台。成都天府新区地理信息公共平台根据以下服务条款为您提供服务。这些条款可由天府新区规划国土
	局随时更新，且毋须另行通知。您在使用成都天府新区地理信息公共平台提供的各项服务之前，应仔细阅读本服务公约。如您不同意本服务公约及/
	或随时对其的修改，您可以主动取消成都天府新区地理信息公共平台提供的服务；您一旦使用成都天府新区地理信息公共平台，即视为您已了解并
	完全同意本服务公约各项内容，包括成都天府新区地理信息公共平台对服务公约随时所做的任何修改，并成为成都天府新区地理信息公共平台用户
	（以下简称“用户”）。

						<h1>2. 服务说明</h1>
		本服务仅依其当前所呈现的状况提供，对于任何用户通讯或个人化设定之时效、删除、传递错误、未予储存或其它任何问题，成都天府新区地
	理信息公共平台均不承担任何责任。成都天府新区地理信息公共平台保留不经事先通知为维修保养、升级或其它目的暂停本服务任何部分的权利。
	为使用本服务，您必须能够自行经有法律资格对您提供互联网接入服务的第三方，进入国际互联网，并应自行支付相关服务费用。此外，您必须自
	行配备及负责与国际联网连线所需之一切必要装备，包括计算机、数据机或其它存取装置。

						<h1>3. 遵守法律</h1>
		您同意遵守《中华人民共和国合同法》、《中华人民共和国著作权法》及其实施条例、《全国人民代表大会常务委员会关于维护互联网安全
	的决定》（“人大安全决定”）[相关网站链接]、《中华人民共和国保守国家秘密法》、《中华人民共和国电信条例》(“电信条例” )[ 相关网站链
	接]、《中华人民共和国计算机信息系统安全保护条例》、《中华人民共和国计算机信息网络国际联网管理暂行规定》及其实施办法、《计算机信
	息系统国际联网保密管理规定》、《互联网信息服务管理办法》、《计算机信息网络国际联网安全保护管理办法》、《互联网电子公告服务管理规
	定》（“电子公告规定”）[相关网站链接]等相关中国法律法规的任何及所有的规定，并对以任何方式使用您的密码和您的帐号使用本服务的任何行
	为及其结果承担全部责任。如违反《人大安全决定》有可能构成犯罪，被追究刑事责任。《电子公告规定》则有明文规定，上网用户使用电子公告
	服务系统对所发布的信息负责。《电信条例》也强调，使用电信网络传输信息的内容及其后果由电信用户负责。在任何情况下，如果成都天府新区
	地理信息公共平台有理由认为您的任何行为，包括但不限于您的任何言论和其它行为违反或可能违反上述法律和法规的任何规定，成都天府新区地
	理信息公共平台可在任何时候不经任何事先通知终止向您提供服务。

						<h1>4. 您的注册义务</h1>
		为了能使用本服务，您同意以下事项∶依本服务注册表之提示提供您本人真实、正确、最新及完整的资料（以下简称“登记资料”）；及随时更新
	登记资料，确保其为真实、正确、最新及完整的资料。若您提供任何错误、不实、过时或不完整或具误导性的资料；或者成都天府新区地理信息公
	共平台有理由怀疑前述资料为错误、不实、过时或不完整或具误导性的，成都天府新区地理信息公共平台有权暂停或终止您的帐号，并拒绝您于现
	在和未来使用本服务之全部或任何部分。成都天府新区地理信息公共平台无须对任何用户的任何登记资料承担任何责任，包括但不限于鉴别、核实
	任何登记资料的真实性、正确性、完整性、适用性及/或是否为最新资料的责任。
	
						<h1>5. 用户帐号、密码及安全</h1>
		完成本服务的登记程序之后，您将收到一个密码及帐号。维持密码及帐号的机密安全，是您的责任。您应对所有用您的密码及帐号的活动负完
	全的责任。您同意∶ (a)您的密码或帐号遭到未获授权的使用，或者发生其它任何安全问题时，您将立即通知成都天府新区地理信息公共平台；且 
	(b)每次上网完毕，把您的帐号关掉。如您未能依前述规定行事，对于任何人利用该密码及帐号所进行的任何行为，您应负完全的责任。对于因此
	而产生的任何损失或损害，成都天府新区地理信息公共平台无法也不承担任何责任。(c) 每个用户都要对其帐户中的所有活动和事件负全责。如果
	您未保管好自己的帐号和密码而对您、成都天府新区地理信息公共平台或第三方造成的损害，您将负全部责任。

						<h1>6. 提供者之责任</h1>
		根据有关法律法规，成都天府新区地理信息公共平台在此郑重提请您注意，任何经由本服务以上载、张贴、发送电子邮件或任何其它方式传送
	的资讯、资料、文字、软件、音乐、音讯、照片、图形、视讯、信息或其它资料（以下简称“内容”），无论系公开还是私下传送，均由内容提供者
	承担责任。成都天府新区地理信息公共平台无法控制经由本服务传送之内容，因此不保证内容的正确性、完整性或品质。您已预知使用本服务时，
	可能会接触到令人不快、不适当或令人厌恶之内容。在任何情况下，成都天府新区地理信息公共平台均不为任何内容负责，包含但不限于任何内容
	之任何错误或遗漏，以及经由本服务以张贴、发送电子邮件或其它方式传送任何内容而衍生之任何损失或损害。但成都天府新区地理信息公共平台
	有权依法停止传输任何前述内容并采取相应行动，包括但不限于暂停用户使用本服务的全部或部分，保存有关记录，并向有关机关报告。

						<h1>7. 用户行为</h1>
		用户应同意将不会利用本服务进行任何违法或不正当的活动，包括但不限于下列行为∶

		上载、张贴、发送电子邮件或以其它方式传送含有下列内容之一的信息： 
			反对宪法所确定的基本原则的； 
			危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的； 
			损害国家荣誉和利益的； 
			煽动民族仇恨、民族歧视、破坏民族团结的； 
			破坏国家宗教政策，宣扬邪教和封建迷信的； 
			散布谣言，扰乱社会秩序，破坏社会稳定的； 
			散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的； 
			侮辱或者诽谤他人，侵害他人合法权利的； 
			含有虚假、诈骗、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容； 
			含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的； 
			以任何方式危害未成年人的利益； 
			冒充任何人或机构，或以虚伪不实的方式陈述或谎称与任何人或机构有关； 
			伪造标题或以其它方式操控识别资料，以伪造经由本服务传送之任何内容之来源； 
			将依据任何法律或合约或法定关系（例如由于雇佣关系和依据保密合约所得知或揭露之内部资料、专属及机密资料）知悉但无权传送之
		任何内容加以上载、张贴、发送电子邮件或以其它方式传送； 
			将侵害他人著作权、专利权、商标权、商业秘密、或其它专属权利（以下简称“专属权利”）之内容加以上载、张贴、发送电子邮件或以
		其它方式传送； 
			将任何广告信函、促销资料、“垃圾邮件”、“滥发信件"、“连锁信件”、“直销”或其它任何形式的劝诱资料加以上载、张贴、发送电
		子邮件或以其它方式传送，惟专供前述目的使用之区域（例如购物室），按照有关适用指引或规则进行的行为不在此限； 
			将设计目的在于干扰、破坏或限制任何计算机软件、硬件或通讯设备功能之计算机病毒（包括但不限于木马程序(trojan horses)、蠕
		虫(worms)、定时炸弹、删除蝇(cancelbots)（以下简称“病毒”）或其它计算机代码、档案和程序之任何资料，加以上载、张贴、发送电子
		邮件或以其它方式传送； 
			破坏正常的对话流程、造成荧屏快速移动，或使本服务其它用户无法输入，或对其它用户参加即时交流的能力产生负面影响； 
			干扰或破坏本服务或与本服务相连线之服务器和网络，或违反任何关于本服务连线网络之规定、程序、政策或规范； 
			跟踪或以其它方式骚扰他人； 
			故意或非故意地违反任何适用的当地、国家和国际法律；
			未经合法授权而截获、篡改、收集、储存或删除他人个人信息、电子邮件或其它数据资料，或将获知的此类资料用于任何非法或不正当目
		的。 
			您已认可成都天府新区地理信息公共平台未对本服务内容加以任何事先审查，对用户的使用行为也无法进行全面控制，您使用任何内容时，
		包括依赖前述内容之正确性、完整性或实用性时，您同意将自行加以判断并承担所有风险，而不依赖于成都天府新区地理信息公共平台。但成
		都天府新区地理信息公共平台及其指定人有权（但无义务）依其自行之考虑，拒绝和删除可经由本服务提供之违反本条款的或其它引起成都天
		府新区地理信息公共平台反感的任何内容。您了解并同意，成都天府新区地理信息公共平台依据法律法规的要求，或基于诚信为了以下目的或
		在合理必要范围内，认定必须将内容加以保存或揭露时，得加以保存或揭露：

			遵守法律程序； 
			执行本服务公约； 
			回应任何第三人提出的权利主张； 
			保护成都天府新区地理信息公共平台、其用户及公众之权利、财产或个人安全； 
			其它成都天府新区地理信息公共平台认为有必要的情况。 
			您了解并同意经由本服务之技术处理及传送，您提供的任何内容，可能 
			经由各个网路加以传送； 
			为了符合及配合连线网路或装置之技术要求而进行改变。

						<h1>8. 国际使用之特别警告</h1>
		您已了解国际互联网的无国界性，同意遵守当地所有关于网上行为及内容之法律法规。您特别同意遵守有关从中国或您所在国家或地区输出信
	息之传输的所有适用法律法规。

						<h1>9. 赔偿</h1>
		由于您通过本服务提供、张贴或传送之内容、您与本服务连线、您违反本服务公约、或您侵害他人任何权利因而衍生或导致任何第三人提出任
	何索赔或请求，包括合理的律师费，您同意赔偿成都天府新区地理信息公共平台及其子公司、关联企业、高级职员、代理人、品牌共有人或其它合
	作伙伴及员工，并使其免受损害。

						<h1>10. 禁止商业行为</h1>
		您同意不对本服务任何部分或本服务之使用或获得，进行复制、拷贝、出售、转售或用于任何其它商业目的。

						<h1>11. 服务之修改</h1>
		成都天府新区地理信息公共平台有权于任何时间暂时或永久修改或终止本服务（或其任何部分），而无论其通知与否。您同意对于本服务所作
	的任何修改、暂停或终止，成都天府新区地理信息公共平台对您和任何第三人均无需承担任何责任。

						<h1>12. 终止服务</h1>
		您同意天成都天府新区地理信息公共平台得基于其自行之考虑，因任何理由，包含但不限于缺乏使用，或天成都天府新区地理信息公共平台认
	为您已经违反本服务公约的文字及精神，终止您的密码、帐号或本服务之使用（或服务之任何部分），并将您在本服务内任何内容加以移除并删除。
	天成都天府新区地理信息公共平台亦得依其自行之考虑，于通知或未通知之情形下，随时终止本服务或其任何部分。您同意依本服务公约任何规定
	提供之本服务，无需进行事先通知即可中断或终止，您承认并同意，天成都天府新区地理信息公共平台可立即关闭或删除您的帐号及您帐号中所有
	相关信息及文件，及/或禁止继续使用前述文件或本服务。此外，您同意若本服务之使用被中断或终止或您的帐号及相关信息和文件被关闭或删除，
	天成都天府新区地理信息公共平台对您或任何第三人均不承担任何责任。

						<h1>13. 天成都天府新区地理信息公共平台之专属权利</h1>
		您了解并同意，本服务及本服务所使用之相关软件（以下简称“软件”）含有受到相关知识产权及其它法律保护之专有保密资料。您也了解并同
	意，经由本服务或广告商向您呈现之赞助广告或信息所包含之内容，亦受到著作权、商标权、服务商标、专利权或其它专属权利之法律保护。未经天
	成都天府新区地理信息公共平台或广告商明示授权，您不得修改、出租、出借、出售、散布本服务或软件之任何部份或全部，或据以制作衍生著作，
	或使用擅自修改后的软件，包括但不限于为了未经授权而使用本服务之目的。天成都天府新区地理信息公共平台仅授予您个人、不可移转及非专属之
	使用权，使您得于单机计算机使用其软件之目的码，但您不得（并不得允许任何第三人）复制、修改、创作衍生著作、进行还原工程、反向组译，或
	以其它方式发现原始码，或出售、转让、再授权或提供软件设定担保，或以其它方式移转软件之任何权利。您同意将通过由天成都天府新区地理信息
	公共平台所提供的界面而非任何其它途径使用本服务。
				</pre>
				</el-scrollbar>
				<span slot="footer" class="dialog-footer">
					<el-button @click="sure()">同意</el-button>
					<el-button type="primary" @click="nosure()">不同意</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码!'));
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
			var checkName=(rule,value,callback)=>{
				if(value === '') {
					callback(new Error('用户名不能为空!'));
				} else{
					this.$fetch('/UserDepartmentRoleWS.asmx/UserUniqueCheck',{
						NAME:value
					}).then((res)=>{
						if(res.code==20000){
							callback();
						}else{
							callback(res.message);
						}
					})
				}
			};
			return {
				dialogTableVisible: false,
				options: [{
					value: 1,
					label: "男"
				}, {
					value: 2,
					label: "女"
				}],
				sexValue: "",
				registerForm: {
					NAME: "",
					PASSWORD: "",
					CARDNAME: "",
					SEX: "",
					BIRTHDAY: "",
					NATIVEPLACE: "",
					ADDRESS: "",
					TEL: "",
					IDCARD: "",
					COMPANY: "",
				},
				checked: false,
				rules: {
					NAME: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					},
					{
						validator: checkName,
						trigger: ['blur']
					}],
					PASSWORD: [{
							required: true,
							message: '请输入密码',
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
						required: true,
						validator: validatePass2,
						trigger: ['blur', 'change']
					}],
					CARDNAME: [{
						required: true,
						message: '请输入您的姓名',
						trigger: 'blur'
					}],
					EMAIL: [{
						required: true,
						message: '请输入邮箱地址',
						trigger: 'change'
					}, {
						type: 'email',
						message: '请输入正确的邮箱地址',
						trigger: ['blur', 'change']
					}],
					IDCARD: [{
						pattern: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,
						message: '请输入正确格式的身份证号',
						trigger: ['blur', 'change']
					}],
					TEL: [{
						pattern: /^1[34578]\d{9}$/,
						message: '请输入正确格式的手机号',
						trigger: ['blur', 'change']
					}],

				},
				pwdGrade: 0,
				pwdCheckword: "",
				hidePWDCK: true
			}
		},
		methods: {
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
			sure() {
				this.dialogTableVisible = false;
				this.checked = true
			},
			nosure() {
				this.dialogTableVisible = false;
				this.checked = false
			},
			register() {
				this.$refs['registerForm'].validate((valid) => {
					if(valid) {
						if(this.checked == false) {
							this.$message({
								message: '请先阅读服务条款和隐私权限政策后，点击同意！',
								type: 'warning'
							});
						} else {
							this.$fetch("/UserDepartmentRoleWS.asmx/EditUserInfo", {
								KEYID: -1,
								REMARK: this.registerForm.REMARK||"",
								EMAIL: this.registerForm.EMAIL||"",
								EDUCATION: this.registerForm.EDUCATION||'',
								NAME: this.registerForm.NAME,
								PASSWORD: this.registerForm.PASSWORD,
								CARDNAME: this.registerForm.CARDNAME,
								SEX: this.registerForm.SEX,
								BIRTHDAY: this.registerForm.BIRTHDAY,
								NATIVEPLACE: this.registerForm.NATIVEPLACE,
								ADDRESS: this.registerForm.ADDRESS,
								TEL: this.registerForm.TEL,
								IDCARD: this.registerForm.IDCARD,
								COMPANY: this.registerForm.COMPANY,
							}).then(res => {
								if(res.code==20000){
									this.$message({
										message: '注册成功，待后台审批',
										type: 'success'
									});
									this.$router.push('/')
								}else{
									this.$message({
										message: res.message,
										type: 'error'
									});
								}
								
							})
						}
					}
				})
			}
		}
	}
</script>
<style>
	.myscrollbar .el-scrollbar__wrap {
		overflow-x: hidden;
	}
</style>

<style scoped="scoped" lang="less">
	.el-scrollbar__bar.is-horizontal>div {
		height: 0;
	}
	
	.register {
		width: 1200px;
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
	
	.htmledit_views {
		line-height: 1.5em;
	}
	
	h1 {
		font-size: 16px;
	}
	
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