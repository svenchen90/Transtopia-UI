var localIDGenerator = function () {
	return '_' + Math.random().toString(36).substr(2, 9);
};
/* 
var questionToJson = function($question){
	
};

var jsonToQuestion = function(data){
	
};

var updateQuestion = function($(question){
	
});
 */
var dataValidator = function(data){
	// try catch
	return true;
};

var jsonToConstraint = function(data, $tab){
	
};

var constratintToJson = function($tab){
	
};

var FormDesigner = function(data){
	this.$form = $();
	
	this.addTab = function(data){
		
	};
	
	this.deleteTabByID = function(tid){
		
	};
	
	this.toJosn = function(){
		
	};
	
	this.loadJson = function(data){
		
	};
	
	this.validateJson = function(data){
		
	};
};

var TabDesigner = function(data){
	this.$tab = $();
	
	this.addQuestion = function(data){
		
	};
	
	this.deleteQuestionByID = function(qid){
		
	};
	
	this.liftQuestion = function(qid){
		
	};
	
	this.lowerQuestion = function(qid){
		
	};
	
	this.liftQToTop = function(qid){
		
	};
	
	this.lowerQToBot = function(qid){
		
	};
	
	this.copyQuestion = function(qid){
		
	};
	
	this.toJson = function(){
		
	};
	
	this.loadJosn = function(data){
		
	};
	
	this.validateJson = function(data){
		
	};
};


var SingleSelecterDesigner = function(data){
	this.$question = $('<div><a></a><a></a></div>');
	
	this.toJson = function(){
		
	};
	
	this.loadJson = function(){
		console.log();
	};
	
	this.validateJson = function(){
		
	};
	
	this.update = function(){
		
	};
	
};


