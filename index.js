function dec(func) {  
  const resFunc = function() {
    func.call(this);
    this.__proto__ = func.prototype;
    func.prototype.parents = func.prototype.parents
      ? func.prototype.parents
      : [];
    func.prototype.parents.unshift({[func.name]: func.prototype.constructor})
  }
  resFunc.prototype = func.prototype;
  return resFunc
}

//-----------------------------------------------------------------

let Foo = function() {
  this.fooProp = 'fooProp';
}

Foo.prototype.fooMeth = function() {console.log('fooMeth called')}
Foo = dec(Foo)

let Boo = function() {
  Foo.call(this)
  this.booProp = 'booProp';
}

Boo.prototype.booMeth = function() {console.log('booMeth called')}
Boo.prototype.__proto__ = Foo.prototype;

Boo = dec(Boo)

let Doo = function() {
  Boo.call(this)
  this.booProp = 'dooProp';
}

Doo.prototype.dooMeth = function() {console.log('dooMeth called')}
Doo.prototype.__proto__ = Boo.prototype;

Doo = dec(Doo)

//-----------------------------------------------------------------

let b = new Doo()
console.log(b.__proto__)
