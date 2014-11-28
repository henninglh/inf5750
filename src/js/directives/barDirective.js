
//The directive/panel is generated from the context of either edit or show
app.directive('barDirective', function(){
    return {
        scope: {},
        restrict: 'E',
        templateUrl: '../views/panelBar.html'
    }
});

//If the panel is an 'edit' the directive should handle it
app.directive('editPanelBar', function(){
    return {
        require: 'barDirective',
        link: function() {

        }
    }

});

//If the panel is a 'show' the directive should handle it
app.directive('showPanelBar', function(){
    return {
        require: 'barDirective',
        link: function(){

        }

    }

});