/**
* @vue/shared v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function ll(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const Me = {}, is = [], xt = () => {
}, Fa = () => !1, an = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), al = (e) => e.startsWith("onUpdate:"), Ke = Object.assign, il = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, vo = Object.prototype.hasOwnProperty, Ae = (e, t) => vo.call(e, t), me = Array.isArray, os = (e) => Fs(e) === "[object Map]", gs = (e) => Fs(e) === "[object Set]", Ml = (e) => Fs(e) === "[object Date]", ye = (e) => typeof e == "function", Ve = (e) => typeof e == "string", gt = (e) => typeof e == "symbol", Oe = (e) => e !== null && typeof e == "object", Ua = (e) => (Oe(e) || ye(e)) && ye(e.then) && ye(e.catch), Va = Object.prototype.toString, Fs = (e) => Va.call(e), yo = (e) => Fs(e).slice(8, -1), Ga = (e) => Fs(e) === "[object Object]", on = (e) => Ve(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, $s = /* @__PURE__ */ ll(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), rn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (s) => t[s] || (t[s] = e(s));
}, wo = /-\w/g, pt = rn(
  (e) => e.replace(wo, (t) => t.slice(1).toUpperCase())
), $o = /\B([A-Z])/g, qt = rn(
  (e) => e.replace($o, "-$1").toLowerCase()
), Ba = rn((e) => e.charAt(0).toUpperCase() + e.slice(1)), Cn = rn(
  (e) => e ? `on${Ba(e)}` : ""
), Ct = (e, t) => !Object.is(e, t), Ks = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, Ha = (e, t, s, l = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: l,
    value: s
  });
}, cn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Il;
const un = () => Il || (Il = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ol(e) {
  if (me(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const l = e[s], i = Ve(l) ? xo(l) : ol(l);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (Ve(e) || Oe(e))
    return e;
}
const ko = /;(?![^(]*\))/g, So = /:([^]+)/, Co = /\/\*[^]*?\*\//g;
function xo(e) {
  const t = {};
  return e.replace(Co, "").split(ko).forEach((s) => {
    if (s) {
      const l = s.split(So);
      l.length > 1 && (t[l[0].trim()] = l[1].trim());
    }
  }), t;
}
function _e(e) {
  let t = "";
  if (Ve(e))
    t = e;
  else if (me(e))
    for (let s = 0; s < e.length; s++) {
      const l = _e(e[s]);
      l && (t += l + " ");
    }
  else if (Oe(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Ro = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Eo = /* @__PURE__ */ ll(Ro);
function ja(e) {
  return !!e || e === "";
}
function To(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let l = 0; s && l < e.length; l++)
    s = Kt(e[l], t[l]);
  return s;
}
function Kt(e, t) {
  if (e === t) return !0;
  let s = Ml(e), l = Ml(t);
  if (s || l)
    return s && l ? e.getTime() === t.getTime() : !1;
  if (s = gt(e), l = gt(t), s || l)
    return e === t;
  if (s = me(e), l = me(t), s || l)
    return s && l ? To(e, t) : !1;
  if (s = Oe(e), l = Oe(t), s || l) {
    if (!s || !l)
      return !1;
    const i = Object.keys(e).length, r = Object.keys(t).length;
    if (i !== r)
      return !1;
    for (const c in e) {
      const u = e.hasOwnProperty(c), d = t.hasOwnProperty(c);
      if (u && !d || !u && d || !Kt(e[c], t[c]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function rl(e, t) {
  return e.findIndex((s) => Kt(s, t));
}
const Wa = (e) => !!(e && e.__v_isRef === !0), o = (e) => Ve(e) ? e : e == null ? "" : me(e) || Oe(e) && (e.toString === Va || !ye(e.toString)) ? Wa(e) ? o(e.value) : JSON.stringify(e, Ka, 2) : String(e), Ka = (e, t) => Wa(t) ? Ka(e, t.value) : os(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [l, i], r) => (s[xn(l, r) + " =>"] = i, s),
    {}
  )
} : gs(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => xn(s))
} : gt(t) ? xn(t) : Oe(t) && !me(t) && !Ga(t) ? String(t) : t, xn = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    gt(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
/**
* @vue/reactivity v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let qe;
class za {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = qe, !t && qe && (this.index = (qe.scopes || (qe.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].pause();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].resume();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = qe;
      try {
        return qe = this, t();
      } finally {
        qe = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = qe, qe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (qe = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let s, l;
      for (s = 0, l = this.effects.length; s < l; s++)
        this.effects[s].stop();
      for (this.effects.length = 0, s = 0, l = this.cleanups.length; s < l; s++)
        this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        for (s = 0, l = this.scopes.length; s < l; s++)
          this.scopes[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function qa(e) {
  return new za(e);
}
function Ja() {
  return qe;
}
function Ao(e, t = !1) {
  qe && qe.cleanups.push(e);
}
let Ie;
const Rn = /* @__PURE__ */ new WeakSet();
class Qa {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, qe && qe.active && qe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Rn.has(this) && (Rn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Za(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Nl(this), Xa(this);
    const t = Ie, s = ht;
    Ie = this, ht = !0;
    try {
      return this.fn();
    } finally {
      ei(this), Ie = t, ht = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        dl(t);
      this.deps = this.depsTail = void 0, Nl(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Rn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Vn(this) && this.run();
  }
  get dirty() {
    return Vn(this);
  }
}
let Ya = 0, ks, Ss;
function Za(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Ss, Ss = e;
    return;
  }
  e.next = ks, ks = e;
}
function cl() {
  Ya++;
}
function ul() {
  if (--Ya > 0)
    return;
  if (Ss) {
    let t = Ss;
    for (Ss = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; ks; ) {
    let t = ks;
    for (ks = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (l) {
          e || (e = l);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function Xa(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ei(e) {
  let t, s = e.depsTail, l = s;
  for (; l; ) {
    const i = l.prevDep;
    l.version === -1 ? (l === s && (s = i), dl(l), Po(l)) : t = l, l.dep.activeLink = l.prevActiveLink, l.prevActiveLink = void 0, l = i;
  }
  e.deps = t, e.depsTail = s;
}
function Vn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ti(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ti(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ps) || (e.globalVersion = Ps, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Vn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = Ie, l = ht;
  Ie = e, ht = !0;
  try {
    Xa(e);
    const i = e.fn(e._value);
    (t.version === 0 || Ct(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    Ie = s, ht = l, ei(e), e.flags &= -3;
  }
}
function dl(e, t = !1) {
  const { dep: s, prevSub: l, nextSub: i } = e;
  if (l && (l.nextSub = i, e.prevSub = void 0), i && (i.prevSub = l, e.nextSub = void 0), s.subs === e && (s.subs = l, !l && s.computed)) {
    s.computed.flags &= -5;
    for (let r = s.computed.deps; r; r = r.nextDep)
      dl(r, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function Po(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let ht = !0;
const si = [];
function Dt() {
  si.push(ht), ht = !1;
}
function Lt() {
  const e = si.pop();
  ht = e === void 0 ? !0 : e;
}
function Nl(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = Ie;
    Ie = void 0;
    try {
      t();
    } finally {
      Ie = s;
    }
  }
}
let Ps = 0;
class Oo {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class fl {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Ie || !ht || Ie === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== Ie)
      s = this.activeLink = new Oo(Ie, this), Ie.deps ? (s.prevDep = Ie.depsTail, Ie.depsTail.nextDep = s, Ie.depsTail = s) : Ie.deps = Ie.depsTail = s, ni(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const l = s.nextDep;
      l.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = l), s.prevDep = Ie.depsTail, s.nextDep = void 0, Ie.depsTail.nextDep = s, Ie.depsTail = s, Ie.deps === s && (Ie.deps = l);
    }
    return s;
  }
  trigger(t) {
    this.version++, Ps++, this.notify(t);
  }
  notify(t) {
    cl();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      ul();
    }
  }
}
function ni(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let l = t.deps; l; l = l.nextDep)
        ni(l);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const Qs = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ Symbol(
  ""
), Gn = /* @__PURE__ */ Symbol(
  ""
), Os = /* @__PURE__ */ Symbol(
  ""
);
function Je(e, t, s) {
  if (ht && Ie) {
    let l = Qs.get(e);
    l || Qs.set(e, l = /* @__PURE__ */ new Map());
    let i = l.get(s);
    i || (l.set(s, i = new fl()), i.map = l, i.key = s), i.track();
  }
}
function Mt(e, t, s, l, i, r) {
  const c = Qs.get(e);
  if (!c) {
    Ps++;
    return;
  }
  const u = (d) => {
    d && d.trigger();
  };
  if (cl(), t === "clear")
    c.forEach(u);
  else {
    const d = me(e), g = d && on(s);
    if (d && s === "length") {
      const f = Number(l);
      c.forEach((p, h) => {
        (h === "length" || h === Os || !gt(h) && h >= f) && u(p);
      });
    } else
      switch ((s !== void 0 || c.has(void 0)) && u(c.get(s)), g && u(c.get(Os)), t) {
        case "add":
          d ? g && u(c.get("length")) : (u(c.get(Xt)), os(e) && u(c.get(Gn)));
          break;
        case "delete":
          d || (u(c.get(Xt)), os(e) && u(c.get(Gn)));
          break;
        case "set":
          os(e) && u(c.get(Xt));
          break;
      }
  }
  ul();
}
function Mo(e, t) {
  const s = Qs.get(e);
  return s && s.get(t);
}
function ts(e) {
  const t = /* @__PURE__ */ Ce(e);
  return t === e ? t : (Je(t, "iterate", Os), /* @__PURE__ */ ct(e) ? t : t.map(_t));
}
function dn(e) {
  return Je(e = /* @__PURE__ */ Ce(e), "iterate", Os), e;
}
function kt(e, t) {
  return /* @__PURE__ */ Ut(e) ? us(/* @__PURE__ */ Rt(e) ? _t(t) : t) : _t(t);
}
const Io = {
  __proto__: null,
  [Symbol.iterator]() {
    return En(this, Symbol.iterator, (e) => kt(this, e));
  },
  concat(...e) {
    return ts(this).concat(
      ...e.map((t) => me(t) ? ts(t) : t)
    );
  },
  entries() {
    return En(this, "entries", (e) => (e[1] = kt(this, e[1]), e));
  },
  every(e, t) {
    return Tt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Tt(
      this,
      "filter",
      e,
      t,
      (s) => s.map((l) => kt(this, l)),
      arguments
    );
  },
  find(e, t) {
    return Tt(
      this,
      "find",
      e,
      t,
      (s) => kt(this, s),
      arguments
    );
  },
  findIndex(e, t) {
    return Tt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Tt(
      this,
      "findLast",
      e,
      t,
      (s) => kt(this, s),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Tt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Tt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Tn(this, "includes", e);
  },
  indexOf(...e) {
    return Tn(this, "indexOf", e);
  },
  join(e) {
    return ts(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Tn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Tt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return bs(this, "pop");
  },
  push(...e) {
    return bs(this, "push", e);
  },
  reduce(e, ...t) {
    return Dl(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Dl(this, "reduceRight", e, t);
  },
  shift() {
    return bs(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Tt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return bs(this, "splice", e);
  },
  toReversed() {
    return ts(this).toReversed();
  },
  toSorted(e) {
    return ts(this).toSorted(e);
  },
  toSpliced(...e) {
    return ts(this).toSpliced(...e);
  },
  unshift(...e) {
    return bs(this, "unshift", e);
  },
  values() {
    return En(this, "values", (e) => kt(this, e));
  }
};
function En(e, t, s) {
  const l = dn(e), i = l[t]();
  return l !== e && !/* @__PURE__ */ ct(e) && (i._next = i.next, i.next = () => {
    const r = i._next();
    return r.done || (r.value = s(r.value)), r;
  }), i;
}
const No = Array.prototype;
function Tt(e, t, s, l, i, r) {
  const c = dn(e), u = c !== e && !/* @__PURE__ */ ct(e), d = c[t];
  if (d !== No[t]) {
    const p = d.apply(e, r);
    return u ? _t(p) : p;
  }
  let g = s;
  c !== e && (u ? g = function(p, h) {
    return s.call(this, kt(e, p), h, e);
  } : s.length > 2 && (g = function(p, h) {
    return s.call(this, p, h, e);
  }));
  const f = d.call(c, g, l);
  return u && i ? i(f) : f;
}
function Dl(e, t, s, l) {
  const i = dn(e), r = i !== e && !/* @__PURE__ */ ct(e);
  let c = s, u = !1;
  i !== e && (r ? (u = l.length === 0, c = function(g, f, p) {
    return u && (u = !1, g = kt(e, g)), s.call(this, g, kt(e, f), p, e);
  }) : s.length > 3 && (c = function(g, f, p) {
    return s.call(this, g, f, p, e);
  }));
  const d = i[t](c, ...l);
  return u ? kt(e, d) : d;
}
function Tn(e, t, s) {
  const l = /* @__PURE__ */ Ce(e);
  Je(l, "iterate", Os);
  const i = l[t](...s);
  return (i === -1 || i === !1) && /* @__PURE__ */ fn(s[0]) ? (s[0] = /* @__PURE__ */ Ce(s[0]), l[t](...s)) : i;
}
function bs(e, t, s = []) {
  Dt(), cl();
  const l = (/* @__PURE__ */ Ce(e))[t].apply(e, s);
  return ul(), Lt(), l;
}
const Do = /* @__PURE__ */ ll("__proto__,__v_isRef,__isVue"), li = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(gt)
);
function Lo(e) {
  gt(e) || (e = String(e));
  const t = /* @__PURE__ */ Ce(this);
  return Je(t, "has", e), t.hasOwnProperty(e);
}
class ai {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, l) {
    if (s === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, r = this._isShallow;
    if (s === "__v_isReactive")
      return !i;
    if (s === "__v_isReadonly")
      return i;
    if (s === "__v_isShallow")
      return r;
    if (s === "__v_raw")
      return l === (i ? r ? zo : ci : r ? ri : oi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(l) ? t : void 0;
    const c = me(t);
    if (!i) {
      let d;
      if (c && (d = Io[s]))
        return d;
      if (s === "hasOwnProperty")
        return Lo;
    }
    const u = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Fe(t) ? t : l
    );
    if ((gt(s) ? li.has(s) : Do(s)) || (i || Je(t, "get", s), r))
      return u;
    if (/* @__PURE__ */ Fe(u)) {
      const d = c && on(s) ? u : u.value;
      return i && Oe(d) ? /* @__PURE__ */ Hn(d) : d;
    }
    return Oe(u) ? i ? /* @__PURE__ */ Hn(u) : /* @__PURE__ */ Ft(u) : u;
  }
}
class ii extends ai {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, l, i) {
    let r = t[s];
    const c = me(t) && on(s);
    if (!this._isShallow) {
      const g = /* @__PURE__ */ Ut(r);
      if (!/* @__PURE__ */ ct(l) && !/* @__PURE__ */ Ut(l) && (r = /* @__PURE__ */ Ce(r), l = /* @__PURE__ */ Ce(l)), !c && /* @__PURE__ */ Fe(r) && !/* @__PURE__ */ Fe(l))
        return g || (r.value = l), !0;
    }
    const u = c ? Number(s) < t.length : Ae(t, s), d = Reflect.set(
      t,
      s,
      l,
      /* @__PURE__ */ Fe(t) ? t : i
    );
    return t === /* @__PURE__ */ Ce(i) && (u ? Ct(l, r) && Mt(t, "set", s, l) : Mt(t, "add", s, l)), d;
  }
  deleteProperty(t, s) {
    const l = Ae(t, s);
    t[s];
    const i = Reflect.deleteProperty(t, s);
    return i && l && Mt(t, "delete", s, void 0), i;
  }
  has(t, s) {
    const l = Reflect.has(t, s);
    return (!gt(s) || !li.has(s)) && Je(t, "has", s), l;
  }
  ownKeys(t) {
    return Je(
      t,
      "iterate",
      me(t) ? "length" : Xt
    ), Reflect.ownKeys(t);
  }
}
class Fo extends ai {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const Uo = /* @__PURE__ */ new ii(), Vo = /* @__PURE__ */ new Fo(), Go = /* @__PURE__ */ new ii(!0);
const Bn = (e) => e, Gs = (e) => Reflect.getPrototypeOf(e);
function Bo(e, t, s) {
  return function(...l) {
    const i = this.__v_raw, r = /* @__PURE__ */ Ce(i), c = os(r), u = e === "entries" || e === Symbol.iterator && c, d = e === "keys" && c, g = i[e](...l), f = s ? Bn : t ? us : _t;
    return !t && Je(
      r,
      "iterate",
      d ? Gn : Xt
    ), Ke(
      // inheriting all iterator properties
      Object.create(g),
      {
        // iterator protocol
        next() {
          const { value: p, done: h } = g.next();
          return h ? { value: p, done: h } : {
            value: u ? [f(p[0]), f(p[1])] : f(p),
            done: h
          };
        }
      }
    );
  };
}
function Bs(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ho(e, t) {
  const s = {
    get(i) {
      const r = this.__v_raw, c = /* @__PURE__ */ Ce(r), u = /* @__PURE__ */ Ce(i);
      e || (Ct(i, u) && Je(c, "get", i), Je(c, "get", u));
      const { has: d } = Gs(c), g = t ? Bn : e ? us : _t;
      if (d.call(c, i))
        return g(r.get(i));
      if (d.call(c, u))
        return g(r.get(u));
      r !== c && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && Je(/* @__PURE__ */ Ce(i), "iterate", Xt), i.size;
    },
    has(i) {
      const r = this.__v_raw, c = /* @__PURE__ */ Ce(r), u = /* @__PURE__ */ Ce(i);
      return e || (Ct(i, u) && Je(c, "has", i), Je(c, "has", u)), i === u ? r.has(i) : r.has(i) || r.has(u);
    },
    forEach(i, r) {
      const c = this, u = c.__v_raw, d = /* @__PURE__ */ Ce(u), g = t ? Bn : e ? us : _t;
      return !e && Je(d, "iterate", Xt), u.forEach((f, p) => i.call(r, g(f), g(p), c));
    }
  };
  return Ke(
    s,
    e ? {
      add: Bs("add"),
      set: Bs("set"),
      delete: Bs("delete"),
      clear: Bs("clear")
    } : {
      add(i) {
        const r = /* @__PURE__ */ Ce(this), c = Gs(r), u = /* @__PURE__ */ Ce(i), d = !t && !/* @__PURE__ */ ct(i) && !/* @__PURE__ */ Ut(i) ? u : i;
        return c.has.call(r, d) || Ct(i, d) && c.has.call(r, i) || Ct(u, d) && c.has.call(r, u) || (r.add(d), Mt(r, "add", d, d)), this;
      },
      set(i, r) {
        !t && !/* @__PURE__ */ ct(r) && !/* @__PURE__ */ Ut(r) && (r = /* @__PURE__ */ Ce(r));
        const c = /* @__PURE__ */ Ce(this), { has: u, get: d } = Gs(c);
        let g = u.call(c, i);
        g || (i = /* @__PURE__ */ Ce(i), g = u.call(c, i));
        const f = d.call(c, i);
        return c.set(i, r), g ? Ct(r, f) && Mt(c, "set", i, r) : Mt(c, "add", i, r), this;
      },
      delete(i) {
        const r = /* @__PURE__ */ Ce(this), { has: c, get: u } = Gs(r);
        let d = c.call(r, i);
        d || (i = /* @__PURE__ */ Ce(i), d = c.call(r, i)), u && u.call(r, i);
        const g = r.delete(i);
        return d && Mt(r, "delete", i, void 0), g;
      },
      clear() {
        const i = /* @__PURE__ */ Ce(this), r = i.size !== 0, c = i.clear();
        return r && Mt(
          i,
          "clear",
          void 0,
          void 0
        ), c;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    s[i] = Bo(i, e, t);
  }), s;
}
function pl(e, t) {
  const s = Ho(e, t);
  return (l, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? l : Reflect.get(
    Ae(s, i) && i in l ? s : l,
    i,
    r
  );
}
const jo = {
  get: /* @__PURE__ */ pl(!1, !1)
}, Wo = {
  get: /* @__PURE__ */ pl(!1, !0)
}, Ko = {
  get: /* @__PURE__ */ pl(!0, !1)
};
const oi = /* @__PURE__ */ new WeakMap(), ri = /* @__PURE__ */ new WeakMap(), ci = /* @__PURE__ */ new WeakMap(), zo = /* @__PURE__ */ new WeakMap();
function qo(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Jo(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : qo(yo(e));
}
// @__NO_SIDE_EFFECTS__
function Ft(e) {
  return /* @__PURE__ */ Ut(e) ? e : hl(
    e,
    !1,
    Uo,
    jo,
    oi
  );
}
// @__NO_SIDE_EFFECTS__
function ui(e) {
  return hl(
    e,
    !1,
    Go,
    Wo,
    ri
  );
}
// @__NO_SIDE_EFFECTS__
function Hn(e) {
  return hl(
    e,
    !0,
    Vo,
    Ko,
    ci
  );
}
function hl(e, t, s, l, i) {
  if (!Oe(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = Jo(e);
  if (r === 0)
    return e;
  const c = i.get(e);
  if (c)
    return c;
  const u = new Proxy(
    e,
    r === 2 ? l : s
  );
  return i.set(e, u), u;
}
// @__NO_SIDE_EFFECTS__
function Rt(e) {
  return /* @__PURE__ */ Ut(e) ? /* @__PURE__ */ Rt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Ut(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function ct(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function fn(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Ce(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Ce(t) : e;
}
function gl(e) {
  return !Ae(e, "__v_skip") && Object.isExtensible(e) && Ha(e, "__v_skip", !0), e;
}
const _t = (e) => Oe(e) ? /* @__PURE__ */ Ft(e) : e, us = (e) => Oe(e) ? /* @__PURE__ */ Hn(e) : e;
// @__NO_SIDE_EFFECTS__
function Fe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function H(e) {
  return di(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Qo(e) {
  return di(e, !0);
}
function di(e, t) {
  return /* @__PURE__ */ Fe(e) ? e : new Yo(e, t);
}
class Yo {
  constructor(t, s) {
    this.dep = new fl(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ Ce(t), this._value = s ? t : _t(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, l = this.__v_isShallow || /* @__PURE__ */ ct(t) || /* @__PURE__ */ Ut(t);
    t = l ? t : /* @__PURE__ */ Ce(t), Ct(t, s) && (this._rawValue = t, this._value = l ? t : _t(t), this.dep.trigger());
  }
}
function a(e) {
  return /* @__PURE__ */ Fe(e) ? e.value : e;
}
const Zo = {
  get: (e, t, s) => t === "__v_raw" ? e : a(Reflect.get(e, t, s)),
  set: (e, t, s, l) => {
    const i = e[t];
    return /* @__PURE__ */ Fe(i) && !/* @__PURE__ */ Fe(s) ? (i.value = s, !0) : Reflect.set(e, t, s, l);
  }
};
function _l(e) {
  return /* @__PURE__ */ Rt(e) ? e : new Proxy(e, Zo);
}
// @__NO_SIDE_EFFECTS__
function Xo(e) {
  const t = me(e) ? new Array(e.length) : {};
  for (const s in e)
    t[s] = fi(e, s);
  return t;
}
class er {
  constructor(t, s, l) {
    this._object = t, this._key = s, this._defaultValue = l, this.__v_isRef = !0, this._value = void 0, this._raw = /* @__PURE__ */ Ce(t);
    let i = !0, r = t;
    if (!me(t) || !on(String(s)))
      do
        i = !/* @__PURE__ */ fn(r) || /* @__PURE__ */ ct(r);
      while (i && (r = r.__v_raw));
    this._shallow = i;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = a(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ Fe(this._raw[this._key])) {
      const s = this._object[this._key];
      if (/* @__PURE__ */ Fe(s)) {
        s.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return Mo(this._raw, this._key);
  }
}
class tr {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function sr(e, t, s) {
  return /* @__PURE__ */ Fe(e) ? e : ye(e) ? new tr(e) : Oe(e) && arguments.length > 1 ? fi(e, t, s) : /* @__PURE__ */ H(e);
}
function fi(e, t, s) {
  return new er(e, t, s);
}
class nr {
  constructor(t, s, l) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new fl(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ps - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = l;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Ie !== this)
      return Za(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ti(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function lr(e, t, s = !1) {
  let l, i;
  return ye(e) ? l = e : (l = e.get, i = e.set), new nr(l, i, s);
}
const Hs = {}, Ys = /* @__PURE__ */ new WeakMap();
let Yt;
function ar(e, t = !1, s = Yt) {
  if (s) {
    let l = Ys.get(s);
    l || Ys.set(s, l = []), l.push(e);
  }
}
function ir(e, t, s = Me) {
  const { immediate: l, deep: i, once: r, scheduler: c, augmentJob: u, call: d } = s, g = (N) => i ? N : /* @__PURE__ */ ct(N) || i === !1 || i === 0 ? It(N, 1) : It(N);
  let f, p, h, _, $ = !1, x = !1;
  if (/* @__PURE__ */ Fe(e) ? (p = () => e.value, $ = /* @__PURE__ */ ct(e)) : /* @__PURE__ */ Rt(e) ? (p = () => g(e), $ = !0) : me(e) ? (x = !0, $ = e.some((N) => /* @__PURE__ */ Rt(N) || /* @__PURE__ */ ct(N)), p = () => e.map((N) => {
    if (/* @__PURE__ */ Fe(N))
      return N.value;
    if (/* @__PURE__ */ Rt(N))
      return g(N);
    if (ye(N))
      return d ? d(N, 2) : N();
  })) : ye(e) ? t ? p = d ? () => d(e, 2) : e : p = () => {
    if (h) {
      Dt();
      try {
        h();
      } finally {
        Lt();
      }
    }
    const N = Yt;
    Yt = f;
    try {
      return d ? d(e, 3, [_]) : e(_);
    } finally {
      Yt = N;
    }
  } : p = xt, t && i) {
    const N = p, Z = i === !0 ? 1 / 0 : i;
    p = () => It(N(), Z);
  }
  const j = Ja(), V = () => {
    f.stop(), j && j.active && il(j.effects, f);
  };
  if (r && t) {
    const N = t;
    t = (...Z) => {
      N(...Z), V();
    };
  }
  let F = x ? new Array(e.length).fill(Hs) : Hs;
  const W = (N) => {
    if (!(!(f.flags & 1) || !f.dirty && !N))
      if (t) {
        const Z = f.run();
        if (i || $ || (x ? Z.some((L, T) => Ct(L, F[T])) : Ct(Z, F))) {
          h && h();
          const L = Yt;
          Yt = f;
          try {
            const T = [
              Z,
              // pass undefined as the old value when it's changed for the first time
              F === Hs ? void 0 : x && F[0] === Hs ? [] : F,
              _
            ];
            F = Z, d ? d(t, 3, T) : (
              // @ts-expect-error
              t(...T)
            );
          } finally {
            Yt = L;
          }
        }
      } else
        f.run();
  };
  return u && u(W), f = new Qa(p), f.scheduler = c ? () => c(W, !1) : W, _ = (N) => ar(N, !1, f), h = f.onStop = () => {
    const N = Ys.get(f);
    if (N) {
      if (d)
        d(N, 4);
      else
        for (const Z of N) Z();
      Ys.delete(f);
    }
  }, t ? l ? W(!0) : F = f.run() : c ? c(W.bind(null, !0), !0) : f.run(), V.pause = f.pause.bind(f), V.resume = f.resume.bind(f), V.stop = V, V;
}
function It(e, t = 1 / 0, s) {
  if (t <= 0 || !Oe(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ Fe(e))
    It(e.value, t, s);
  else if (me(e))
    for (let l = 0; l < e.length; l++)
      It(e[l], t, s);
  else if (gs(e) || os(e))
    e.forEach((l) => {
      It(l, t, s);
    });
  else if (Ga(e)) {
    for (const l in e)
      It(e[l], t, s);
    for (const l of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, l) && It(e[l], t, s);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Us(e, t, s, l) {
  try {
    return l ? e(...l) : e();
  } catch (i) {
    pn(i, t, s);
  }
}
function Et(e, t, s, l) {
  if (ye(e)) {
    const i = Us(e, t, s, l);
    return i && Ua(i) && i.catch((r) => {
      pn(r, t, s);
    }), i;
  }
  if (me(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(Et(e[r], t, s, l));
    return i;
  }
}
function pn(e, t, s, l = !0) {
  const i = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: c } = t && t.appContext.config || Me;
  if (t) {
    let u = t.parent;
    const d = t.proxy, g = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; u; ) {
      const f = u.ec;
      if (f) {
        for (let p = 0; p < f.length; p++)
          if (f[p](e, d, g) === !1)
            return;
      }
      u = u.parent;
    }
    if (r) {
      Dt(), Us(r, null, 10, [
        e,
        d,
        g
      ]), Lt();
      return;
    }
  }
  or(e, s, i, l, c);
}
function or(e, t, s, l = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const et = [];
let $t = -1;
const rs = [];
let jt = null, ns = 0;
const pi = /* @__PURE__ */ Promise.resolve();
let Zs = null;
function hn(e) {
  const t = Zs || pi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function rr(e) {
  let t = $t + 1, s = et.length;
  for (; t < s; ) {
    const l = t + s >>> 1, i = et[l], r = Ms(i);
    r < e || r === e && i.flags & 2 ? t = l + 1 : s = l;
  }
  return t;
}
function ml(e) {
  if (!(e.flags & 1)) {
    const t = Ms(e), s = et[et.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Ms(s) ? et.push(e) : et.splice(rr(t), 0, e), e.flags |= 1, hi();
  }
}
function hi() {
  Zs || (Zs = pi.then(_i));
}
function cr(e) {
  me(e) ? rs.push(...e) : jt && e.id === -1 ? jt.splice(ns + 1, 0, e) : e.flags & 1 || (rs.push(e), e.flags |= 1), hi();
}
function Ll(e, t, s = $t + 1) {
  for (; s < et.length; s++) {
    const l = et[s];
    if (l && l.flags & 2) {
      if (e && l.id !== e.uid)
        continue;
      et.splice(s, 1), s--, l.flags & 4 && (l.flags &= -2), l(), l.flags & 4 || (l.flags &= -2);
    }
  }
}
function gi(e) {
  if (rs.length) {
    const t = [...new Set(rs)].sort(
      (s, l) => Ms(s) - Ms(l)
    );
    if (rs.length = 0, jt) {
      jt.push(...t);
      return;
    }
    for (jt = t, ns = 0; ns < jt.length; ns++) {
      const s = jt[ns];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    jt = null, ns = 0;
  }
}
const Ms = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function _i(e) {
  try {
    for ($t = 0; $t < et.length; $t++) {
      const t = et[$t];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Us(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; $t < et.length; $t++) {
      const t = et[$t];
      t && (t.flags &= -2);
    }
    $t = -1, et.length = 0, gi(), Zs = null, (et.length || rs.length) && _i();
  }
}
let Qe = null, mi = null;
function Xs(e) {
  const t = Qe;
  return Qe = e, mi = e && e.type.__scopeId || null, t;
}
function le(e, t = Qe, s) {
  if (!t || e._n)
    return e;
  const l = (...i) => {
    l._d && sn(-1);
    const r = Xs(t);
    let c;
    try {
      c = e(...i);
    } finally {
      Xs(r), l._d && sn(1);
    }
    return c;
  };
  return l._n = !0, l._c = !0, l._d = !0, l;
}
function $e(e, t) {
  if (Qe === null)
    return e;
  const s = bn(Qe), l = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [r, c, u, d = Me] = t[i];
    r && (ye(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && It(c), l.push({
      dir: r,
      instance: s,
      value: c,
      oldValue: void 0,
      arg: u,
      modifiers: d
    }));
  }
  return e;
}
function Jt(e, t, s, l) {
  const i = e.dirs, r = t && t.dirs;
  for (let c = 0; c < i.length; c++) {
    const u = i[c];
    r && (u.oldValue = r[c].value);
    let d = u.dir[l];
    d && (Dt(), Et(d, s, 8, [
      e.el,
      u,
      e,
      t
    ]), Lt());
  }
}
function zs(e, t) {
  if (tt) {
    let s = tt.provides;
    const l = tt.parent && tt.parent.provides;
    l === s && (s = tt.provides = Object.create(l)), s[e] = t;
  }
}
function ut(e, t, s = !1) {
  const l = Wi();
  if (l || es) {
    let i = es ? es._context.provides : l ? l.parent == null || l.ce ? l.vnode.appContext && l.vnode.appContext.provides : l.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return s && ye(t) ? t.call(l && l.proxy) : t;
  }
}
function ur() {
  return !!(Wi() || es);
}
const dr = /* @__PURE__ */ Symbol.for("v-scx"), fr = () => ut(dr);
function Pe(e, t, s) {
  return bi(e, t, s);
}
function bi(e, t, s = Me) {
  const { immediate: l, deep: i, flush: r, once: c } = s, u = Ke({}, s), d = t && l || !t && r !== "post";
  let g;
  if (Ds) {
    if (r === "sync") {
      const _ = fr();
      g = _.__watcherHandles || (_.__watcherHandles = []);
    } else if (!d) {
      const _ = () => {
      };
      return _.stop = xt, _.resume = xt, _.pause = xt, _;
    }
  }
  const f = tt;
  u.call = (_, $, x) => Et(_, f, $, x);
  let p = !1;
  r === "post" ? u.scheduler = (_) => {
    lt(_, f && f.suspense);
  } : r !== "sync" && (p = !0, u.scheduler = (_, $) => {
    $ ? _() : ml(_);
  }), u.augmentJob = (_) => {
    t && (_.flags |= 4), p && (_.flags |= 2, f && (_.id = f.uid, _.i = f));
  };
  const h = ir(e, t, u);
  return Ds && (g ? g.push(h) : d && h()), h;
}
function pr(e, t, s) {
  const l = this.proxy, i = Ve(e) ? e.includes(".") ? vi(l, e) : () => l[e] : e.bind(l, l);
  let r;
  ye(t) ? r = t : (r = t.handler, s = t);
  const c = Vs(this), u = bi(i, r.bind(l), s);
  return c(), u;
}
function vi(e, t) {
  const s = t.split(".");
  return () => {
    let l = e;
    for (let i = 0; i < s.length && l; i++)
      l = l[s[i]];
    return l;
  };
}
const hr = /* @__PURE__ */ Symbol("_vte"), gr = (e) => e.__isTeleport, _r = /* @__PURE__ */ Symbol("_leaveCb");
function bl(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, bl(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Le(e, t) {
  return ye(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ke({ name: e.name }, t, { setup: e })
  ) : e;
}
function yi(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Fl(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const en = /* @__PURE__ */ new WeakMap();
function Cs(e, t, s, l, i = !1) {
  if (me(e)) {
    e.forEach(
      (x, j) => Cs(
        x,
        t && (me(t) ? t[j] : t),
        s,
        l,
        i
      )
    );
    return;
  }
  if (cs(l) && !i) {
    l.shapeFlag & 512 && l.type.__asyncResolved && l.component.subTree.component && Cs(e, t, s, l.component.subTree);
    return;
  }
  const r = l.shapeFlag & 4 ? bn(l.component) : l.el, c = i ? null : r, { i: u, r: d } = e, g = t && t.r, f = u.refs === Me ? u.refs = {} : u.refs, p = u.setupState, h = /* @__PURE__ */ Ce(p), _ = p === Me ? Fa : (x) => Fl(f, x) ? !1 : Ae(h, x), $ = (x, j) => !(j && Fl(f, j));
  if (g != null && g !== d) {
    if (Ul(t), Ve(g))
      f[g] = null, _(g) && (p[g] = null);
    else if (/* @__PURE__ */ Fe(g)) {
      const x = t;
      $(g, x.k) && (g.value = null), x.k && (f[x.k] = null);
    }
  }
  if (ye(d))
    Us(d, u, 12, [c, f]);
  else {
    const x = Ve(d), j = /* @__PURE__ */ Fe(d);
    if (x || j) {
      const V = () => {
        if (e.f) {
          const F = x ? _(d) ? p[d] : f[d] : $() || !e.k ? d.value : f[e.k];
          if (i)
            me(F) && il(F, r);
          else if (me(F))
            F.includes(r) || F.push(r);
          else if (x)
            f[d] = [r], _(d) && (p[d] = f[d]);
          else {
            const W = [r];
            $(d, e.k) && (d.value = W), e.k && (f[e.k] = W);
          }
        } else x ? (f[d] = c, _(d) && (p[d] = c)) : j && ($(d, e.k) && (d.value = c), e.k && (f[e.k] = c));
      };
      if (c) {
        const F = () => {
          V(), en.delete(e);
        };
        F.id = -1, en.set(e, F), lt(F, s);
      } else
        Ul(e), V();
    }
  }
}
function Ul(e) {
  const t = en.get(e);
  t && (t.flags |= 8, en.delete(e));
}
un().requestIdleCallback;
un().cancelIdleCallback;
const cs = (e) => !!e.type.__asyncLoader, wi = (e) => e.type.__isKeepAlive;
function mr(e, t) {
  $i(e, "a", t);
}
function br(e, t) {
  $i(e, "da", t);
}
function $i(e, t, s = tt) {
  const l = e.__wdc || (e.__wdc = () => {
    let i = s;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (gn(t, l, s), s) {
    let i = s.parent;
    for (; i && i.parent; )
      wi(i.parent.vnode) && vr(l, t, s, i), i = i.parent;
  }
}
function vr(e, t, s, l) {
  const i = gn(
    t,
    e,
    l,
    !0
    /* prepend */
  );
  Si(() => {
    il(l[t], i);
  }, s);
}
function gn(e, t, s = tt, l = !1) {
  if (s) {
    const i = s[e] || (s[e] = []), r = t.__weh || (t.__weh = (...c) => {
      Dt();
      const u = Vs(s), d = Et(t, s, e, c);
      return u(), Lt(), d;
    });
    return l ? i.unshift(r) : i.push(r), r;
  }
}
const Gt = (e) => (t, s = tt) => {
  (!Ds || e === "sp") && gn(e, (...l) => t(...l), s);
}, yr = Gt("bm"), ze = Gt("m"), wr = Gt(
  "bu"
), $r = Gt("u"), ki = Gt(
  "bum"
), Si = Gt("um"), kr = Gt(
  "sp"
), Sr = Gt("rtg"), Cr = Gt("rtc");
function xr(e, t = tt) {
  gn("ec", e, t);
}
const Rr = /* @__PURE__ */ Symbol.for("v-ndc");
function we(e, t, s, l) {
  let i;
  const r = s, c = me(e);
  if (c || Ve(e)) {
    const u = c && /* @__PURE__ */ Rt(e);
    let d = !1, g = !1;
    u && (d = !/* @__PURE__ */ ct(e), g = /* @__PURE__ */ Ut(e), e = dn(e)), i = new Array(e.length);
    for (let f = 0, p = e.length; f < p; f++)
      i[f] = t(
        d ? g ? us(_t(e[f])) : _t(e[f]) : e[f],
        f,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let u = 0; u < e; u++)
      i[u] = t(u + 1, u, void 0, r);
  } else if (Oe(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (u, d) => t(u, d, void 0, r)
      );
    else {
      const u = Object.keys(e);
      i = new Array(u.length);
      for (let d = 0, g = u.length; d < g; d++) {
        const f = u[d];
        i[d] = t(e[f], f, d, r);
      }
    }
  else
    i = [];
  return i;
}
function Vl(e, t, s = {}, l, i) {
  if (Qe.ce || Qe.parent && cs(Qe.parent) && Qe.parent.ce) {
    const g = Object.keys(s).length > 0;
    return t !== "default" && (s.name = t), m(), He(
      Y,
      null,
      [X("slot", s, l)],
      g ? -2 : 64
    );
  }
  let r = e[t];
  r && r._c && (r._d = !1), m();
  const c = r && Ci(r(s)), u = s.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  c && c.key, d = He(
    Y,
    {
      key: (u && !gt(u) ? u : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!c && l ? "_fb" : "")
    },
    c || [],
    c && e._ === 1 ? 64 : -2
  );
  return d.scopeId && (d.slotScopeIds = [d.scopeId + "-s"]), r && r._c && (r._d = !0), d;
}
function Ci(e) {
  return e.some((t) => Ns(t) ? !(t.type === Vt || t.type === Y && !Ci(t.children)) : !0) ? e : null;
}
const jn = (e) => e ? Ki(e) ? bn(e) : jn(e.parent) : null, xs = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ke(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => jn(e.parent),
    $root: (e) => jn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Ri(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ml(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = hn.bind(e.proxy)),
    $watch: (e) => pr.bind(e)
  })
), An = (e, t) => e !== Me && !e.__isScriptSetup && Ae(e, t), Er = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: l, data: i, props: r, accessCache: c, type: u, appContext: d } = e;
    if (t[0] !== "$") {
      const h = c[t];
      if (h !== void 0)
        switch (h) {
          case 1:
            return l[t];
          case 2:
            return i[t];
          case 4:
            return s[t];
          case 3:
            return r[t];
        }
      else {
        if (An(l, t))
          return c[t] = 1, l[t];
        if (i !== Me && Ae(i, t))
          return c[t] = 2, i[t];
        if (Ae(r, t))
          return c[t] = 3, r[t];
        if (s !== Me && Ae(s, t))
          return c[t] = 4, s[t];
        Wn && (c[t] = 0);
      }
    }
    const g = xs[t];
    let f, p;
    if (g)
      return t === "$attrs" && Je(e.attrs, "get", ""), g(e);
    if (
      // css module (injected by vue-loader)
      (f = u.__cssModules) && (f = f[t])
    )
      return f;
    if (s !== Me && Ae(s, t))
      return c[t] = 4, s[t];
    if (
      // global properties
      p = d.config.globalProperties, Ae(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, s) {
    const { data: l, setupState: i, ctx: r } = e;
    return An(i, t) ? (i[t] = s, !0) : l !== Me && Ae(l, t) ? (l[t] = s, !0) : Ae(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: l, appContext: i, props: r, type: c }
  }, u) {
    let d;
    return !!(s[u] || e !== Me && u[0] !== "$" && Ae(e, u) || An(t, u) || Ae(r, u) || Ae(l, u) || Ae(xs, u) || Ae(i.config.globalProperties, u) || (d = c.__cssModules) && d[u]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : Ae(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Gl(e) {
  return me(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let Wn = !0;
function Tr(e) {
  const t = Ri(e), s = e.proxy, l = e.ctx;
  Wn = !1, t.beforeCreate && Bl(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: r,
    methods: c,
    watch: u,
    provide: d,
    inject: g,
    // lifecycle
    created: f,
    beforeMount: p,
    mounted: h,
    beforeUpdate: _,
    updated: $,
    activated: x,
    deactivated: j,
    beforeDestroy: V,
    beforeUnmount: F,
    destroyed: W,
    unmounted: N,
    render: Z,
    renderTracked: L,
    renderTriggered: T,
    errorCaptured: y,
    serverPrefetch: C,
    // public API
    expose: A,
    inheritAttrs: ce,
    // assets
    components: re,
    directives: pe,
    filters: Re
  } = t;
  if (g && Ar(g, l, null), c)
    for (const k in c) {
      const P = c[k];
      ye(P) && (l[k] = P.bind(s));
    }
  if (i) {
    const k = i.call(s, s);
    Oe(k) && (e.data = /* @__PURE__ */ Ft(k));
  }
  if (Wn = !0, r)
    for (const k in r) {
      const P = r[k], be = ye(P) ? P.bind(s, s) : ye(P.get) ? P.get.bind(s, s) : xt, fe = !ye(P) && ye(P.set) ? P.set.bind(s) : xt, K = z({
        get: be,
        set: fe
      });
      Object.defineProperty(l, k, {
        enumerable: !0,
        configurable: !0,
        get: () => K.value,
        set: (q) => K.value = q
      });
    }
  if (u)
    for (const k in u)
      xi(u[k], l, s, k);
  if (d) {
    const k = ye(d) ? d.call(s) : d;
    Reflect.ownKeys(k).forEach((P) => {
      zs(P, k[P]);
    });
  }
  f && Bl(f, e, "c");
  function G(k, P) {
    me(P) ? P.forEach((be) => k(be.bind(s))) : P && k(P.bind(s));
  }
  if (G(yr, p), G(ze, h), G(wr, _), G($r, $), G(mr, x), G(br, j), G(xr, y), G(Cr, L), G(Sr, T), G(ki, F), G(Si, N), G(kr, C), me(A))
    if (A.length) {
      const k = e.exposed || (e.exposed = {});
      A.forEach((P) => {
        Object.defineProperty(k, P, {
          get: () => s[P],
          set: (be) => s[P] = be,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  Z && e.render === xt && (e.render = Z), ce != null && (e.inheritAttrs = ce), re && (e.components = re), pe && (e.directives = pe), C && yi(e);
}
function Ar(e, t, s = xt) {
  me(e) && (e = Kn(e));
  for (const l in e) {
    const i = e[l];
    let r;
    Oe(i) ? "default" in i ? r = ut(
      i.from || l,
      i.default,
      !0
    ) : r = ut(i.from || l) : r = ut(i), /* @__PURE__ */ Fe(r) ? Object.defineProperty(t, l, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (c) => r.value = c
    }) : t[l] = r;
  }
}
function Bl(e, t, s) {
  Et(
    me(e) ? e.map((l) => l.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function xi(e, t, s, l) {
  let i = l.includes(".") ? vi(s, l) : () => s[l];
  if (Ve(e)) {
    const r = t[e];
    ye(r) && Pe(i, r);
  } else if (ye(e))
    Pe(i, e.bind(s));
  else if (Oe(e))
    if (me(e))
      e.forEach((r) => xi(r, t, s, l));
    else {
      const r = ye(e.handler) ? e.handler.bind(s) : t[e.handler];
      ye(r) && Pe(i, r, e);
    }
}
function Ri(e) {
  const t = e.type, { mixins: s, extends: l } = t, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: c }
  } = e.appContext, u = r.get(t);
  let d;
  return u ? d = u : !i.length && !s && !l ? d = t : (d = {}, i.length && i.forEach(
    (g) => tn(d, g, c, !0)
  ), tn(d, t, c)), Oe(t) && r.set(t, d), d;
}
function tn(e, t, s, l = !1) {
  const { mixins: i, extends: r } = t;
  r && tn(e, r, s, !0), i && i.forEach(
    (c) => tn(e, c, s, !0)
  );
  for (const c in t)
    if (!(l && c === "expose")) {
      const u = Pr[c] || s && s[c];
      e[c] = u ? u(e[c], t[c]) : t[c];
    }
  return e;
}
const Pr = {
  data: Hl,
  props: jl,
  emits: jl,
  // objects
  methods: ws,
  computed: ws,
  // lifecycle
  beforeCreate: Ze,
  created: Ze,
  beforeMount: Ze,
  mounted: Ze,
  beforeUpdate: Ze,
  updated: Ze,
  beforeDestroy: Ze,
  beforeUnmount: Ze,
  destroyed: Ze,
  unmounted: Ze,
  activated: Ze,
  deactivated: Ze,
  errorCaptured: Ze,
  serverPrefetch: Ze,
  // assets
  components: ws,
  directives: ws,
  // watch
  watch: Mr,
  // provide / inject
  provide: Hl,
  inject: Or
};
function Hl(e, t) {
  return t ? e ? function() {
    return Ke(
      ye(e) ? e.call(this, this) : e,
      ye(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Or(e, t) {
  return ws(Kn(e), Kn(t));
}
function Kn(e) {
  if (me(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function Ze(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ws(e, t) {
  return e ? Ke(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function jl(e, t) {
  return e ? me(e) && me(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ke(
    /* @__PURE__ */ Object.create(null),
    Gl(e),
    Gl(t ?? {})
  ) : t;
}
function Mr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = Ke(/* @__PURE__ */ Object.create(null), e);
  for (const l in t)
    s[l] = Ze(e[l], t[l]);
  return s;
}
function Ei() {
  return {
    app: null,
    config: {
      isNativeTag: Fa,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Ir = 0;
function Nr(e, t) {
  return function(l, i = null) {
    ye(l) || (l = Ke({}, l)), i != null && !Oe(i) && (i = null);
    const r = Ei(), c = /* @__PURE__ */ new WeakSet(), u = [];
    let d = !1;
    const g = r.app = {
      _uid: Ir++,
      _component: l,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: fc,
      get config() {
        return r.config;
      },
      set config(f) {
      },
      use(f, ...p) {
        return c.has(f) || (f && ye(f.install) ? (c.add(f), f.install(g, ...p)) : ye(f) && (c.add(f), f(g, ...p))), g;
      },
      mixin(f) {
        return r.mixins.includes(f) || r.mixins.push(f), g;
      },
      component(f, p) {
        return p ? (r.components[f] = p, g) : r.components[f];
      },
      directive(f, p) {
        return p ? (r.directives[f] = p, g) : r.directives[f];
      },
      mount(f, p, h) {
        if (!d) {
          const _ = g._ceVNode || X(l, i);
          return _.appContext = r, h === !0 ? h = "svg" : h === !1 && (h = void 0), e(_, f, h), d = !0, g._container = f, f.__vue_app__ = g, bn(_.component);
        }
      },
      onUnmount(f) {
        u.push(f);
      },
      unmount() {
        d && (Et(
          u,
          g._instance,
          16
        ), e(null, g._container), delete g._container.__vue_app__);
      },
      provide(f, p) {
        return r.provides[f] = p, g;
      },
      runWithContext(f) {
        const p = es;
        es = g;
        try {
          return f();
        } finally {
          es = p;
        }
      }
    };
    return g;
  };
}
let es = null;
const Dr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${pt(t)}Modifiers`] || e[`${qt(t)}Modifiers`];
function Lr(e, t, ...s) {
  if (e.isUnmounted) return;
  const l = e.vnode.props || Me;
  let i = s;
  const r = t.startsWith("update:"), c = r && Dr(l, t.slice(7));
  c && (c.trim && (i = s.map((f) => Ve(f) ? f.trim() : f)), c.number && (i = s.map(cn)));
  let u, d = l[u = Cn(t)] || // also try camelCase event handler (#2249)
  l[u = Cn(pt(t))];
  !d && r && (d = l[u = Cn(qt(t))]), d && Et(
    d,
    e,
    6,
    i
  );
  const g = l[u + "Once"];
  if (g) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[u])
      return;
    e.emitted[u] = !0, Et(
      g,
      e,
      6,
      i
    );
  }
}
const Fr = /* @__PURE__ */ new WeakMap();
function Ti(e, t, s = !1) {
  const l = s ? Fr : t.emitsCache, i = l.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let c = {}, u = !1;
  if (!ye(e)) {
    const d = (g) => {
      const f = Ti(g, t, !0);
      f && (u = !0, Ke(c, f));
    };
    !s && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  return !r && !u ? (Oe(e) && l.set(e, null), null) : (me(r) ? r.forEach((d) => c[d] = null) : Ke(c, r), Oe(e) && l.set(e, c), c);
}
function _n(e, t) {
  return !e || !an(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Ae(e, t[0].toLowerCase() + t.slice(1)) || Ae(e, qt(t)) || Ae(e, t));
}
function Wl(e) {
  const {
    type: t,
    vnode: s,
    proxy: l,
    withProxy: i,
    propsOptions: [r],
    slots: c,
    attrs: u,
    emit: d,
    render: g,
    renderCache: f,
    props: p,
    data: h,
    setupState: _,
    ctx: $,
    inheritAttrs: x
  } = e, j = Xs(e);
  let V, F;
  try {
    if (s.shapeFlag & 4) {
      const N = i || l, Z = N;
      V = St(
        g.call(
          Z,
          N,
          f,
          p,
          _,
          h,
          $
        )
      ), F = u;
    } else {
      const N = t;
      V = St(
        N.length > 1 ? N(
          p,
          { attrs: u, slots: c, emit: d }
        ) : N(
          p,
          null
        )
      ), F = t.props ? u : Ur(u);
    }
  } catch (N) {
    Rs.length = 0, pn(N, e, 1), V = X(Vt);
  }
  let W = V;
  if (F && x !== !1) {
    const N = Object.keys(F), { shapeFlag: Z } = W;
    N.length && Z & 7 && (r && N.some(al) && (F = Vr(
      F,
      r
    )), W = ds(W, F, !1, !0));
  }
  return s.dirs && (W = ds(W, null, !1, !0), W.dirs = W.dirs ? W.dirs.concat(s.dirs) : s.dirs), s.transition && bl(W, s.transition), V = W, Xs(j), V;
}
const Ur = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || an(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Vr = (e, t) => {
  const s = {};
  for (const l in e)
    (!al(l) || !(l.slice(9) in t)) && (s[l] = e[l]);
  return s;
};
function Gr(e, t, s) {
  const { props: l, children: i, component: r } = e, { props: c, children: u, patchFlag: d } = t, g = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && d >= 0) {
    if (d & 1024)
      return !0;
    if (d & 16)
      return l ? Kl(l, c, g) : !!c;
    if (d & 8) {
      const f = t.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        const h = f[p];
        if (Ai(c, l, h) && !_n(g, h))
          return !0;
      }
    }
  } else
    return (i || u) && (!u || !u.$stable) ? !0 : l === c ? !1 : l ? c ? Kl(l, c, g) : !0 : !!c;
  return !1;
}
function Kl(e, t, s) {
  const l = Object.keys(t);
  if (l.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < l.length; i++) {
    const r = l[i];
    if (Ai(t, e, r) && !_n(s, r))
      return !0;
  }
  return !1;
}
function Ai(e, t, s) {
  const l = e[s], i = t[s];
  return s === "style" && Oe(l) && Oe(i) ? !Kt(l, i) : l !== i;
}
function Br({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const l = t.subTree;
    if (l.suspense && l.suspense.activeBranch === e && (l.el = e.el), l === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const Pi = {}, Oi = () => Object.create(Pi), Mi = (e) => Object.getPrototypeOf(e) === Pi;
function Hr(e, t, s, l = !1) {
  const i = {}, r = Oi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ii(e, t, i, r);
  for (const c in e.propsOptions[0])
    c in i || (i[c] = void 0);
  s ? e.props = l ? i : /* @__PURE__ */ ui(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function jr(e, t, s, l) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: c }
  } = e, u = /* @__PURE__ */ Ce(i), [d] = e.propsOptions;
  let g = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (l || c > 0) && !(c & 16)
  ) {
    if (c & 8) {
      const f = e.vnode.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        let h = f[p];
        if (_n(e.emitsOptions, h))
          continue;
        const _ = t[h];
        if (d)
          if (Ae(r, h))
            _ !== r[h] && (r[h] = _, g = !0);
          else {
            const $ = pt(h);
            i[$] = zn(
              d,
              u,
              $,
              _,
              e,
              !1
            );
          }
        else
          _ !== r[h] && (r[h] = _, g = !0);
      }
    }
  } else {
    Ii(e, t, i, r) && (g = !0);
    let f;
    for (const p in u)
      (!t || // for camelCase
      !Ae(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = qt(p)) === p || !Ae(t, f))) && (d ? s && // for camelCase
      (s[p] !== void 0 || // for kebab-case
      s[f] !== void 0) && (i[p] = zn(
        d,
        u,
        p,
        void 0,
        e,
        !0
      )) : delete i[p]);
    if (r !== u)
      for (const p in r)
        (!t || !Ae(t, p)) && (delete r[p], g = !0);
  }
  g && Mt(e.attrs, "set", "");
}
function Ii(e, t, s, l) {
  const [i, r] = e.propsOptions;
  let c = !1, u;
  if (t)
    for (let d in t) {
      if ($s(d))
        continue;
      const g = t[d];
      let f;
      i && Ae(i, f = pt(d)) ? !r || !r.includes(f) ? s[f] = g : (u || (u = {}))[f] = g : _n(e.emitsOptions, d) || (!(d in l) || g !== l[d]) && (l[d] = g, c = !0);
    }
  if (r) {
    const d = /* @__PURE__ */ Ce(s), g = u || Me;
    for (let f = 0; f < r.length; f++) {
      const p = r[f];
      s[p] = zn(
        i,
        d,
        p,
        g[p],
        e,
        !Ae(g, p)
      );
    }
  }
  return c;
}
function zn(e, t, s, l, i, r) {
  const c = e[s];
  if (c != null) {
    const u = Ae(c, "default");
    if (u && l === void 0) {
      const d = c.default;
      if (c.type !== Function && !c.skipFactory && ye(d)) {
        const { propsDefaults: g } = i;
        if (s in g)
          l = g[s];
        else {
          const f = Vs(i);
          l = g[s] = d.call(
            null,
            t
          ), f();
        }
      } else
        l = d;
      i.ce && i.ce._setProp(s, l);
    }
    c[
      0
      /* shouldCast */
    ] && (r && !u ? l = !1 : c[
      1
      /* shouldCastTrue */
    ] && (l === "" || l === qt(s)) && (l = !0));
  }
  return l;
}
const Wr = /* @__PURE__ */ new WeakMap();
function Ni(e, t, s = !1) {
  const l = s ? Wr : t.propsCache, i = l.get(e);
  if (i)
    return i;
  const r = e.props, c = {}, u = [];
  let d = !1;
  if (!ye(e)) {
    const f = (p) => {
      d = !0;
      const [h, _] = Ni(p, t, !0);
      Ke(c, h), _ && u.push(..._);
    };
    !s && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!r && !d)
    return Oe(e) && l.set(e, is), is;
  if (me(r))
    for (let f = 0; f < r.length; f++) {
      const p = pt(r[f]);
      zl(p) && (c[p] = Me);
    }
  else if (r)
    for (const f in r) {
      const p = pt(f);
      if (zl(p)) {
        const h = r[f], _ = c[p] = me(h) || ye(h) ? { type: h } : Ke({}, h), $ = _.type;
        let x = !1, j = !0;
        if (me($))
          for (let V = 0; V < $.length; ++V) {
            const F = $[V], W = ye(F) && F.name;
            if (W === "Boolean") {
              x = !0;
              break;
            } else W === "String" && (j = !1);
          }
        else
          x = ye($) && $.name === "Boolean";
        _[
          0
          /* shouldCast */
        ] = x, _[
          1
          /* shouldCastTrue */
        ] = j, (x || Ae(_, "default")) && u.push(p);
      }
    }
  const g = [c, u];
  return Oe(e) && l.set(e, g), g;
}
function zl(e) {
  return e[0] !== "$" && !$s(e);
}
const vl = (e) => e === "_" || e === "_ctx" || e === "$stable", yl = (e) => me(e) ? e.map(St) : [St(e)], Kr = (e, t, s) => {
  if (t._n)
    return t;
  const l = le((...i) => yl(t(...i)), s);
  return l._c = !1, l;
}, Di = (e, t, s) => {
  const l = e._ctx;
  for (const i in e) {
    if (vl(i)) continue;
    const r = e[i];
    if (ye(r))
      t[i] = Kr(i, r, l);
    else if (r != null) {
      const c = yl(r);
      t[i] = () => c;
    }
  }
}, Li = (e, t) => {
  const s = yl(t);
  e.slots.default = () => s;
}, Fi = (e, t, s) => {
  for (const l in t)
    (s || !vl(l)) && (e[l] = t[l]);
}, zr = (e, t, s) => {
  const l = e.slots = Oi();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (Fi(l, t, s), s && Ha(l, "_", i, !0)) : Di(t, l);
  } else t && Li(e, t);
}, qr = (e, t, s) => {
  const { vnode: l, slots: i } = e;
  let r = !0, c = Me;
  if (l.shapeFlag & 32) {
    const u = t._;
    u ? s && u === 1 ? r = !1 : Fi(i, t, s) : (r = !t.$stable, Di(t, i)), c = t;
  } else t && (Li(e, t), c = { default: 1 });
  if (r)
    for (const u in i)
      !vl(u) && c[u] == null && delete i[u];
}, lt = Xr;
function Jr(e) {
  return Qr(e);
}
function Qr(e, t) {
  const s = un();
  s.__VUE__ = !0;
  const {
    insert: l,
    remove: i,
    patchProp: r,
    createElement: c,
    createText: u,
    createComment: d,
    setText: g,
    setElementText: f,
    parentNode: p,
    nextSibling: h,
    setScopeId: _ = xt,
    insertStaticContent: $
  } = e, x = (b, w, S, M = null, U = null, I = null, ee = void 0, Q = null, J = !!w.dynamicChildren) => {
    if (b === w)
      return;
    b && !vs(b, w) && (M = O(b), q(b, U, I, !0), b = null), w.patchFlag === -2 && (J = !1, w.dynamicChildren = null);
    const { type: B, ref: he, shapeFlag: se } = w;
    switch (B) {
      case mn:
        j(b, w, S, M);
        break;
      case Vt:
        V(b, w, S, M);
        break;
      case On:
        b == null && F(w, S, M, ee);
        break;
      case Y:
        re(
          b,
          w,
          S,
          M,
          U,
          I,
          ee,
          Q,
          J
        );
        break;
      default:
        se & 1 ? Z(
          b,
          w,
          S,
          M,
          U,
          I,
          ee,
          Q,
          J
        ) : se & 6 ? pe(
          b,
          w,
          S,
          M,
          U,
          I,
          ee,
          Q,
          J
        ) : (se & 64 || se & 128) && B.process(
          b,
          w,
          S,
          M,
          U,
          I,
          ee,
          Q,
          J,
          de
        );
    }
    he != null && U ? Cs(he, b && b.ref, I, w || b, !w) : he == null && b && b.ref != null && Cs(b.ref, null, I, b, !0);
  }, j = (b, w, S, M) => {
    if (b == null)
      l(
        w.el = u(w.children),
        S,
        M
      );
    else {
      const U = w.el = b.el;
      w.children !== b.children && g(U, w.children);
    }
  }, V = (b, w, S, M) => {
    b == null ? l(
      w.el = d(w.children || ""),
      S,
      M
    ) : w.el = b.el;
  }, F = (b, w, S, M) => {
    [b.el, b.anchor] = $(
      b.children,
      w,
      S,
      M,
      b.el,
      b.anchor
    );
  }, W = ({ el: b, anchor: w }, S, M) => {
    let U;
    for (; b && b !== w; )
      U = h(b), l(b, S, M), b = U;
    l(w, S, M);
  }, N = ({ el: b, anchor: w }) => {
    let S;
    for (; b && b !== w; )
      S = h(b), i(b), b = S;
    i(w);
  }, Z = (b, w, S, M, U, I, ee, Q, J) => {
    if (w.type === "svg" ? ee = "svg" : w.type === "math" && (ee = "mathml"), b == null)
      L(
        w,
        S,
        M,
        U,
        I,
        ee,
        Q,
        J
      );
    else {
      const B = b.el && b.el._isVueCE ? b.el : null;
      try {
        B && B._beginPatch(), C(
          b,
          w,
          U,
          I,
          ee,
          Q,
          J
        );
      } finally {
        B && B._endPatch();
      }
    }
  }, L = (b, w, S, M, U, I, ee, Q) => {
    let J, B;
    const { props: he, shapeFlag: se, transition: R, dirs: D } = b;
    if (J = b.el = c(
      b.type,
      I,
      he && he.is,
      he
    ), se & 8 ? f(J, b.children) : se & 16 && y(
      b.children,
      J,
      null,
      M,
      U,
      Pn(b, I),
      ee,
      Q
    ), D && Jt(b, null, M, "created"), T(J, b, b.scopeId, ee, M), he) {
      for (const ne in he)
        ne !== "value" && !$s(ne) && r(J, ne, null, he[ne], I, M);
      "value" in he && r(J, "value", null, he.value, I), (B = he.onVnodeBeforeMount) && wt(B, M, b);
    }
    D && Jt(b, null, M, "beforeMount");
    const E = Yr(U, R);
    E && R.beforeEnter(J), l(J, w, S), ((B = he && he.onVnodeMounted) || E || D) && lt(() => {
      B && wt(B, M, b), E && R.enter(J), D && Jt(b, null, M, "mounted");
    }, U);
  }, T = (b, w, S, M, U) => {
    if (S && _(b, S), M)
      for (let I = 0; I < M.length; I++)
        _(b, M[I]);
    if (U) {
      let I = U.subTree;
      if (w === I || Bi(I.type) && (I.ssContent === w || I.ssFallback === w)) {
        const ee = U.vnode;
        T(
          b,
          ee,
          ee.scopeId,
          ee.slotScopeIds,
          U.parent
        );
      }
    }
  }, y = (b, w, S, M, U, I, ee, Q, J = 0) => {
    for (let B = J; B < b.length; B++) {
      const he = b[B] = Q ? Ot(b[B]) : St(b[B]);
      x(
        null,
        he,
        w,
        S,
        M,
        U,
        I,
        ee,
        Q
      );
    }
  }, C = (b, w, S, M, U, I, ee) => {
    const Q = w.el = b.el;
    let { patchFlag: J, dynamicChildren: B, dirs: he } = w;
    J |= b.patchFlag & 16;
    const se = b.props || Me, R = w.props || Me;
    let D;
    if (S && Qt(S, !1), (D = R.onVnodeBeforeUpdate) && wt(D, S, w, b), he && Jt(w, b, S, "beforeUpdate"), S && Qt(S, !0), (se.innerHTML && R.innerHTML == null || se.textContent && R.textContent == null) && f(Q, ""), B ? A(
      b.dynamicChildren,
      B,
      Q,
      S,
      M,
      Pn(w, U),
      I
    ) : ee || P(
      b,
      w,
      Q,
      null,
      S,
      M,
      Pn(w, U),
      I,
      !1
    ), J > 0) {
      if (J & 16)
        ce(Q, se, R, S, U);
      else if (J & 2 && se.class !== R.class && r(Q, "class", null, R.class, U), J & 4 && r(Q, "style", se.style, R.style, U), J & 8) {
        const E = w.dynamicProps;
        for (let ne = 0; ne < E.length; ne++) {
          const ve = E[ne], Ye = se[ve], nt = R[ve];
          (nt !== Ye || ve === "value") && r(Q, ve, Ye, nt, U, S);
        }
      }
      J & 1 && b.children !== w.children && f(Q, w.children);
    } else !ee && B == null && ce(Q, se, R, S, U);
    ((D = R.onVnodeUpdated) || he) && lt(() => {
      D && wt(D, S, w, b), he && Jt(w, b, S, "updated");
    }, M);
  }, A = (b, w, S, M, U, I, ee) => {
    for (let Q = 0; Q < w.length; Q++) {
      const J = b[Q], B = w[Q], he = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        J.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (J.type === Y || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !vs(J, B) || // - In the case of a component, it could contain anything.
        J.shapeFlag & 198) ? p(J.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          S
        )
      );
      x(
        J,
        B,
        he,
        null,
        M,
        U,
        I,
        ee,
        !0
      );
    }
  }, ce = (b, w, S, M, U) => {
    if (w !== S) {
      if (w !== Me)
        for (const I in w)
          !$s(I) && !(I in S) && r(
            b,
            I,
            w[I],
            null,
            U,
            M
          );
      for (const I in S) {
        if ($s(I)) continue;
        const ee = S[I], Q = w[I];
        ee !== Q && I !== "value" && r(b, I, Q, ee, U, M);
      }
      "value" in S && r(b, "value", w.value, S.value, U);
    }
  }, re = (b, w, S, M, U, I, ee, Q, J) => {
    const B = w.el = b ? b.el : u(""), he = w.anchor = b ? b.anchor : u("");
    let { patchFlag: se, dynamicChildren: R, slotScopeIds: D } = w;
    D && (Q = Q ? Q.concat(D) : D), b == null ? (l(B, S, M), l(he, S, M), y(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      w.children || [],
      S,
      he,
      U,
      I,
      ee,
      Q,
      J
    )) : se > 0 && se & 64 && R && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    b.dynamicChildren && b.dynamicChildren.length === R.length ? (A(
      b.dynamicChildren,
      R,
      S,
      U,
      I,
      ee,
      Q
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (w.key != null || U && w === U.subTree) && Ui(
      b,
      w,
      !0
      /* shallow */
    )) : P(
      b,
      w,
      S,
      he,
      U,
      I,
      ee,
      Q,
      J
    );
  }, pe = (b, w, S, M, U, I, ee, Q, J) => {
    w.slotScopeIds = Q, b == null ? w.shapeFlag & 512 ? U.ctx.activate(
      w,
      S,
      M,
      ee,
      J
    ) : Re(
      w,
      S,
      M,
      U,
      I,
      ee,
      J
    ) : Ee(b, w, J);
  }, Re = (b, w, S, M, U, I, ee) => {
    const Q = b.component = ic(
      b,
      M,
      U
    );
    if (wi(b) && (Q.ctx.renderer = de), oc(Q, !1, ee), Q.asyncDep) {
      if (U && U.registerDep(Q, G, ee), !b.el) {
        const J = Q.subTree = X(Vt);
        V(null, J, w, S), b.placeholder = J.el;
      }
    } else
      G(
        Q,
        b,
        w,
        S,
        U,
        I,
        ee
      );
  }, Ee = (b, w, S) => {
    const M = w.component = b.component;
    if (Gr(b, w, S))
      if (M.asyncDep && !M.asyncResolved) {
        k(M, w, S);
        return;
      } else
        M.next = w, M.update();
    else
      w.el = b.el, M.vnode = w;
  }, G = (b, w, S, M, U, I, ee) => {
    const Q = () => {
      if (b.isMounted) {
        let { next: se, bu: R, u: D, parent: E, vnode: ne } = b;
        {
          const vt = Vi(b);
          if (vt) {
            se && (se.el = ne.el, k(b, se, ee)), vt.asyncDep.then(() => {
              lt(() => {
                b.isUnmounted || B();
              }, U);
            });
            return;
          }
        }
        let ve = se, Ye;
        Qt(b, !1), se ? (se.el = ne.el, k(b, se, ee)) : se = ne, R && Ks(R), (Ye = se.props && se.props.onVnodeBeforeUpdate) && wt(Ye, E, se, ne), Qt(b, !0);
        const nt = Wl(b), bt = b.subTree;
        b.subTree = nt, x(
          bt,
          nt,
          // parent may have changed if it's in a teleport
          p(bt.el),
          // anchor may have changed if it's in a fragment
          O(bt),
          b,
          U,
          I
        ), se.el = nt.el, ve === null && Br(b, nt.el), D && lt(D, U), (Ye = se.props && se.props.onVnodeUpdated) && lt(
          () => wt(Ye, E, se, ne),
          U
        );
      } else {
        let se;
        const { el: R, props: D } = w, { bm: E, m: ne, parent: ve, root: Ye, type: nt } = b, bt = cs(w);
        Qt(b, !1), E && Ks(E), !bt && (se = D && D.onVnodeBeforeMount) && wt(se, ve, w), Qt(b, !0);
        {
          Ye.ce && Ye.ce._hasShadowRoot() && Ye.ce._injectChildStyle(
            nt,
            b.parent ? b.parent.type : void 0
          );
          const vt = b.subTree = Wl(b);
          x(
            null,
            vt,
            S,
            M,
            b,
            U,
            I
          ), w.el = vt.el;
        }
        if (ne && lt(ne, U), !bt && (se = D && D.onVnodeMounted)) {
          const vt = w;
          lt(
            () => wt(se, ve, vt),
            U
          );
        }
        (w.shapeFlag & 256 || ve && cs(ve.vnode) && ve.vnode.shapeFlag & 256) && b.a && lt(b.a, U), b.isMounted = !0, w = S = M = null;
      }
    };
    b.scope.on();
    const J = b.effect = new Qa(Q);
    b.scope.off();
    const B = b.update = J.run.bind(J), he = b.job = J.runIfDirty.bind(J);
    he.i = b, he.id = b.uid, J.scheduler = () => ml(he), Qt(b, !0), B();
  }, k = (b, w, S) => {
    w.component = b;
    const M = b.vnode.props;
    b.vnode = w, b.next = null, jr(b, w.props, M, S), qr(b, w.children, S), Dt(), Ll(b), Lt();
  }, P = (b, w, S, M, U, I, ee, Q, J = !1) => {
    const B = b && b.children, he = b ? b.shapeFlag : 0, se = w.children, { patchFlag: R, shapeFlag: D } = w;
    if (R > 0) {
      if (R & 128) {
        fe(
          B,
          se,
          S,
          M,
          U,
          I,
          ee,
          Q,
          J
        );
        return;
      } else if (R & 256) {
        be(
          B,
          se,
          S,
          M,
          U,
          I,
          ee,
          Q,
          J
        );
        return;
      }
    }
    D & 8 ? (he & 16 && We(B, U, I), se !== B && f(S, se)) : he & 16 ? D & 16 ? fe(
      B,
      se,
      S,
      M,
      U,
      I,
      ee,
      Q,
      J
    ) : We(B, U, I, !0) : (he & 8 && f(S, ""), D & 16 && y(
      se,
      S,
      M,
      U,
      I,
      ee,
      Q,
      J
    ));
  }, be = (b, w, S, M, U, I, ee, Q, J) => {
    b = b || is, w = w || is;
    const B = b.length, he = w.length, se = Math.min(B, he);
    let R;
    for (R = 0; R < se; R++) {
      const D = w[R] = J ? Ot(w[R]) : St(w[R]);
      x(
        b[R],
        D,
        S,
        null,
        U,
        I,
        ee,
        Q,
        J
      );
    }
    B > he ? We(
      b,
      U,
      I,
      !0,
      !1,
      se
    ) : y(
      w,
      S,
      M,
      U,
      I,
      ee,
      Q,
      J,
      se
    );
  }, fe = (b, w, S, M, U, I, ee, Q, J) => {
    let B = 0;
    const he = w.length;
    let se = b.length - 1, R = he - 1;
    for (; B <= se && B <= R; ) {
      const D = b[B], E = w[B] = J ? Ot(w[B]) : St(w[B]);
      if (vs(D, E))
        x(
          D,
          E,
          S,
          null,
          U,
          I,
          ee,
          Q,
          J
        );
      else
        break;
      B++;
    }
    for (; B <= se && B <= R; ) {
      const D = b[se], E = w[R] = J ? Ot(w[R]) : St(w[R]);
      if (vs(D, E))
        x(
          D,
          E,
          S,
          null,
          U,
          I,
          ee,
          Q,
          J
        );
      else
        break;
      se--, R--;
    }
    if (B > se) {
      if (B <= R) {
        const D = R + 1, E = D < he ? w[D].el : M;
        for (; B <= R; )
          x(
            null,
            w[B] = J ? Ot(w[B]) : St(w[B]),
            S,
            E,
            U,
            I,
            ee,
            Q,
            J
          ), B++;
      }
    } else if (B > R)
      for (; B <= se; )
        q(b[B], U, I, !0), B++;
    else {
      const D = B, E = B, ne = /* @__PURE__ */ new Map();
      for (B = E; B <= R; B++) {
        const ot = w[B] = J ? Ot(w[B]) : St(w[B]);
        ot.key != null && ne.set(ot.key, B);
      }
      let ve, Ye = 0;
      const nt = R - E + 1;
      let bt = !1, vt = 0;
      const ms = new Array(nt);
      for (B = 0; B < nt; B++) ms[B] = 0;
      for (B = D; B <= se; B++) {
        const ot = b[B];
        if (Ye >= nt) {
          q(ot, U, I, !0);
          continue;
        }
        let yt;
        if (ot.key != null)
          yt = ne.get(ot.key);
        else
          for (ve = E; ve <= R; ve++)
            if (ms[ve - E] === 0 && vs(ot, w[ve])) {
              yt = ve;
              break;
            }
        yt === void 0 ? q(ot, U, I, !0) : (ms[yt - E] = B + 1, yt >= vt ? vt = yt : bt = !0, x(
          ot,
          w[yt],
          S,
          null,
          U,
          I,
          ee,
          Q,
          J
        ), Ye++);
      }
      const Al = bt ? Zr(ms) : is;
      for (ve = Al.length - 1, B = nt - 1; B >= 0; B--) {
        const ot = E + B, yt = w[ot], Pl = w[ot + 1], Ol = ot + 1 < he ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Pl.el || Gi(Pl)
        ) : M;
        ms[B] === 0 ? x(
          null,
          yt,
          S,
          Ol,
          U,
          I,
          ee,
          Q,
          J
        ) : bt && (ve < 0 || B !== Al[ve] ? K(yt, S, Ol, 2) : ve--);
      }
    }
  }, K = (b, w, S, M, U = null) => {
    const { el: I, type: ee, transition: Q, children: J, shapeFlag: B } = b;
    if (B & 6) {
      K(b.component.subTree, w, S, M);
      return;
    }
    if (B & 128) {
      b.suspense.move(w, S, M);
      return;
    }
    if (B & 64) {
      ee.move(b, w, S, de);
      return;
    }
    if (ee === Y) {
      l(I, w, S);
      for (let se = 0; se < J.length; se++)
        K(J[se], w, S, M);
      l(b.anchor, w, S);
      return;
    }
    if (ee === On) {
      W(b, w, S);
      return;
    }
    if (M !== 2 && B & 1 && Q)
      if (M === 0)
        Q.beforeEnter(I), l(I, w, S), lt(() => Q.enter(I), U);
      else {
        const { leave: se, delayLeave: R, afterLeave: D } = Q, E = () => {
          b.ctx.isUnmounted ? i(I) : l(I, w, S);
        }, ne = () => {
          I._isLeaving && I[_r](
            !0
            /* cancelled */
          ), se(I, () => {
            E(), D && D();
          });
        };
        R ? R(I, E, ne) : ne();
      }
    else
      l(I, w, S);
  }, q = (b, w, S, M = !1, U = !1) => {
    const {
      type: I,
      props: ee,
      ref: Q,
      children: J,
      dynamicChildren: B,
      shapeFlag: he,
      patchFlag: se,
      dirs: R,
      cacheIndex: D
    } = b;
    if (se === -2 && (U = !1), Q != null && (Dt(), Cs(Q, null, S, b, !0), Lt()), D != null && (w.renderCache[D] = void 0), he & 256) {
      w.ctx.deactivate(b);
      return;
    }
    const E = he & 1 && R, ne = !cs(b);
    let ve;
    if (ne && (ve = ee && ee.onVnodeBeforeUnmount) && wt(ve, w, b), he & 6)
      Ge(b.component, S, M);
    else {
      if (he & 128) {
        b.suspense.unmount(S, M);
        return;
      }
      E && Jt(b, null, w, "beforeUnmount"), he & 64 ? b.type.remove(
        b,
        w,
        S,
        de,
        M
      ) : B && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !B.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (I !== Y || se > 0 && se & 64) ? We(
        B,
        w,
        S,
        !1,
        !0
      ) : (I === Y && se & 384 || !U && he & 16) && We(J, w, S), M && ae(b);
    }
    (ne && (ve = ee && ee.onVnodeUnmounted) || E) && lt(() => {
      ve && wt(ve, w, b), E && Jt(b, null, w, "unmounted");
    }, S);
  }, ae = (b) => {
    const { type: w, el: S, anchor: M, transition: U } = b;
    if (w === Y) {
      Se(S, M);
      return;
    }
    if (w === On) {
      N(b);
      return;
    }
    const I = () => {
      i(S), U && !U.persisted && U.afterLeave && U.afterLeave();
    };
    if (b.shapeFlag & 1 && U && !U.persisted) {
      const { leave: ee, delayLeave: Q } = U, J = () => ee(S, I);
      Q ? Q(b.el, I, J) : J();
    } else
      I();
  }, Se = (b, w) => {
    let S;
    for (; b !== w; )
      S = h(b), i(b), b = S;
    i(w);
  }, Ge = (b, w, S) => {
    const { bum: M, scope: U, job: I, subTree: ee, um: Q, m: J, a: B } = b;
    ql(J), ql(B), M && Ks(M), U.stop(), I && (I.flags |= 8, q(ee, b, w, S)), Q && lt(Q, w), lt(() => {
      b.isUnmounted = !0;
    }, w);
  }, We = (b, w, S, M = !1, U = !1, I = 0) => {
    for (let ee = I; ee < b.length; ee++)
      q(b[ee], w, S, M, U);
  }, O = (b) => {
    if (b.shapeFlag & 6)
      return O(b.component.subTree);
    if (b.shapeFlag & 128)
      return b.suspense.next();
    const w = h(b.anchor || b.el), S = w && w[hr];
    return S ? h(S) : w;
  };
  let ie = !1;
  const te = (b, w, S) => {
    let M;
    b == null ? w._vnode && (q(w._vnode, null, null, !0), M = w._vnode.component) : x(
      w._vnode || null,
      b,
      w,
      null,
      null,
      null,
      S
    ), w._vnode = b, ie || (ie = !0, Ll(M), gi(), ie = !1);
  }, de = {
    p: x,
    um: q,
    m: K,
    r: ae,
    mt: Re,
    mc: y,
    pc: P,
    pbc: A,
    n: O,
    o: e
  };
  return {
    render: te,
    hydrate: void 0,
    createApp: Nr(te)
  };
}
function Pn({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function Qt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Yr(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ui(e, t, s = !1) {
  const l = e.children, i = t.children;
  if (me(l) && me(i))
    for (let r = 0; r < l.length; r++) {
      const c = l[r];
      let u = i[r];
      u.shapeFlag & 1 && !u.dynamicChildren && ((u.patchFlag <= 0 || u.patchFlag === 32) && (u = i[r] = Ot(i[r]), u.el = c.el), !s && u.patchFlag !== -2 && Ui(c, u)), u.type === mn && (u.patchFlag === -1 && (u = i[r] = Ot(u)), u.el = c.el), u.type === Vt && !u.el && (u.el = c.el);
    }
}
function Zr(e) {
  const t = e.slice(), s = [0];
  let l, i, r, c, u;
  const d = e.length;
  for (l = 0; l < d; l++) {
    const g = e[l];
    if (g !== 0) {
      if (i = s[s.length - 1], e[i] < g) {
        t[l] = i, s.push(l);
        continue;
      }
      for (r = 0, c = s.length - 1; r < c; )
        u = r + c >> 1, e[s[u]] < g ? r = u + 1 : c = u;
      g < e[s[r]] && (r > 0 && (t[l] = s[r - 1]), s[r] = l);
    }
  }
  for (r = s.length, c = s[r - 1]; r-- > 0; )
    s[r] = c, c = t[c];
  return s;
}
function Vi(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Vi(t);
}
function ql(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Gi(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Gi(t.subTree) : null;
}
const Bi = (e) => e.__isSuspense;
function Xr(e, t) {
  t && t.pendingBranch ? me(e) ? t.effects.push(...e) : t.effects.push(e) : cr(e);
}
const Y = /* @__PURE__ */ Symbol.for("v-fgt"), mn = /* @__PURE__ */ Symbol.for("v-txt"), Vt = /* @__PURE__ */ Symbol.for("v-cmt"), On = /* @__PURE__ */ Symbol.for("v-stc"), Rs = [];
let rt = null;
function m(e = !1) {
  Rs.push(rt = e ? null : []);
}
function ec() {
  Rs.pop(), rt = Rs[Rs.length - 1] || null;
}
let Is = 1;
function sn(e, t = !1) {
  Is += e, e < 0 && rt && t && (rt.hasOnce = !0);
}
function Hi(e) {
  return e.dynamicChildren = Is > 0 ? rt || is : null, ec(), Is > 0 && rt && rt.push(e), e;
}
function v(e, t, s, l, i, r) {
  return Hi(
    n(
      e,
      t,
      s,
      l,
      i,
      r,
      !0
    )
  );
}
function He(e, t, s, l, i) {
  return Hi(
    X(
      e,
      t,
      s,
      l,
      i,
      !0
    )
  );
}
function Ns(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function vs(e, t) {
  return e.type === t.type && e.key === t.key;
}
const ji = ({ key: e }) => e ?? null, qs = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? Ve(e) || /* @__PURE__ */ Fe(e) || ye(e) ? { i: Qe, r: e, k: t, f: !!s } : e : null);
function n(e, t = null, s = null, l = 0, i = null, r = e === Y ? 0 : 1, c = !1, u = !1) {
  const d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ji(t),
    ref: t && qs(t),
    scopeId: mi,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: l,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Qe
  };
  return u ? ($l(d, s), r & 128 && e.normalize(d)) : s && (d.shapeFlag |= Ve(s) ? 8 : 16), Is > 0 && // avoid a block node from tracking itself
  !c && // has current parent block
  rt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (d.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  d.patchFlag !== 32 && rt.push(d), d;
}
const X = tc;
function tc(e, t = null, s = null, l = 0, i = null, r = !1) {
  if ((!e || e === Rr) && (e = Vt), Ns(e)) {
    const u = ds(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && $l(u, s), Is > 0 && !r && rt && (u.shapeFlag & 6 ? rt[rt.indexOf(e)] = u : rt.push(u)), u.patchFlag = -2, u;
  }
  if (dc(e) && (e = e.__vccOpts), t) {
    t = sc(t);
    let { class: u, style: d } = t;
    u && !Ve(u) && (t.class = _e(u)), Oe(d) && (/* @__PURE__ */ fn(d) && !me(d) && (d = Ke({}, d)), t.style = ol(d));
  }
  const c = Ve(e) ? 1 : Bi(e) ? 128 : gr(e) ? 64 : Oe(e) ? 4 : ye(e) ? 2 : 0;
  return n(
    e,
    t,
    s,
    l,
    i,
    c,
    r,
    !0
  );
}
function sc(e) {
  return e ? /* @__PURE__ */ fn(e) || Mi(e) ? Ke({}, e) : e : null;
}
function ds(e, t, s = !1, l = !1) {
  const { props: i, ref: r, patchFlag: c, children: u, transition: d } = e, g = t ? nc(i || {}, t) : i, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: g,
    key: g && ji(g),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && r ? me(r) ? r.concat(qs(t)) : [r, qs(t)] : qs(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: u,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Y ? c === -1 ? 16 : c | 16 : c,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: d,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ds(e.ssContent),
    ssFallback: e.ssFallback && ds(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return d && l && bl(
    f,
    d.clone(f)
  ), f;
}
function wl(e = " ", t = 0) {
  return X(mn, null, e, t);
}
function ue(e = "", t = !1) {
  return t ? (m(), He(Vt, null, e)) : X(Vt, null, e);
}
function St(e) {
  return e == null || typeof e == "boolean" ? X(Vt) : me(e) ? X(
    Y,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Ns(e) ? Ot(e) : X(mn, null, String(e));
}
function Ot(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ds(e);
}
function $l(e, t) {
  let s = 0;
  const { shapeFlag: l } = e;
  if (t == null)
    t = null;
  else if (me(t))
    s = 16;
  else if (typeof t == "object")
    if (l & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), $l(e, i()), i._c && (i._d = !0));
      return;
    } else {
      s = 32;
      const i = t._;
      !i && !Mi(t) ? t._ctx = Qe : i === 3 && Qe && (Qe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else ye(t) ? (t = { default: t, _ctx: Qe }, s = 32) : (t = String(t), l & 64 ? (s = 16, t = [wl(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function nc(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    for (const i in l)
      if (i === "class")
        t.class !== l.class && (t.class = _e([t.class, l.class]));
      else if (i === "style")
        t.style = ol([t.style, l.style]);
      else if (an(i)) {
        const r = t[i], c = l[i];
        c && r !== c && !(me(r) && r.includes(c)) && (t[i] = r ? [].concat(r, c) : c);
      } else i !== "" && (t[i] = l[i]);
  }
  return t;
}
function wt(e, t, s, l = null) {
  Et(e, t, 7, [
    s,
    l
  ]);
}
const lc = Ei();
let ac = 0;
function ic(e, t, s) {
  const l = e.type, i = (t ? t.appContext : e.appContext) || lc, r = {
    uid: ac++,
    vnode: e,
    type: l,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new za(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Ni(l, i),
    emitsOptions: Ti(l, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Me,
    // inheritAttrs
    inheritAttrs: l.inheritAttrs,
    // state
    ctx: Me,
    data: Me,
    props: Me,
    attrs: Me,
    slots: Me,
    refs: Me,
    setupState: Me,
    setupContext: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Lr.bind(null, r), e.ce && e.ce(r), r;
}
let tt = null;
const Wi = () => tt || Qe;
let nn, qn;
{
  const e = un(), t = (s, l) => {
    let i;
    return (i = e[s]) || (i = e[s] = []), i.push(l), (r) => {
      i.length > 1 ? i.forEach((c) => c(r)) : i[0](r);
    };
  };
  nn = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => tt = s
  ), qn = t(
    "__VUE_SSR_SETTERS__",
    (s) => Ds = s
  );
}
const Vs = (e) => {
  const t = tt;
  return nn(e), e.scope.on(), () => {
    e.scope.off(), nn(t);
  };
}, Jl = () => {
  tt && tt.scope.off(), nn(null);
};
function Ki(e) {
  return e.vnode.shapeFlag & 4;
}
let Ds = !1;
function oc(e, t = !1, s = !1) {
  t && qn(t);
  const { props: l, children: i } = e.vnode, r = Ki(e);
  Hr(e, l, r, t), zr(e, i, s || t);
  const c = r ? rc(e, t) : void 0;
  return t && qn(!1), c;
}
function rc(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Er);
  const { setup: l } = s;
  if (l) {
    Dt();
    const i = e.setupContext = l.length > 1 ? uc(e) : null, r = Vs(e), c = Us(
      l,
      e,
      0,
      [
        e.props,
        i
      ]
    ), u = Ua(c);
    if (Lt(), r(), (u || e.sp) && !cs(e) && yi(e), u) {
      if (c.then(Jl, Jl), t)
        return c.then((d) => {
          Ql(e, d);
        }).catch((d) => {
          pn(d, e, 0);
        });
      e.asyncDep = c;
    } else
      Ql(e, c);
  } else
    zi(e);
}
function Ql(e, t, s) {
  ye(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Oe(t) && (e.setupState = _l(t)), zi(e);
}
function zi(e, t, s) {
  const l = e.type;
  e.render || (e.render = l.render || xt);
  {
    const i = Vs(e);
    Dt();
    try {
      Tr(e);
    } finally {
      Lt(), i();
    }
  }
}
const cc = {
  get(e, t) {
    return Je(e, "get", ""), e[t];
  }
};
function uc(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, cc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function bn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(_l(gl(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in xs)
        return xs[s](e);
    },
    has(t, s) {
      return s in t || s in xs;
    }
  })) : e.proxy;
}
function dc(e) {
  return ye(e) && "__vccOpts" in e;
}
const z = (e, t) => /* @__PURE__ */ lr(e, t, Ds);
function qi(e, t, s) {
  try {
    sn(-1);
    const l = arguments.length;
    return l === 2 ? Oe(t) && !me(t) ? Ns(t) ? X(e, null, [t]) : X(e, t) : X(e, null, t) : (l > 3 ? s = Array.prototype.slice.call(arguments, 2) : l === 3 && Ns(s) && (s = [s]), X(e, t, s));
  } finally {
    sn(1);
  }
}
const fc = "3.5.30";
/**
* @vue/runtime-dom v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Jn;
const Yl = typeof window < "u" && window.trustedTypes;
if (Yl)
  try {
    Jn = /* @__PURE__ */ Yl.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Ji = Jn ? (e) => Jn.createHTML(e) : (e) => e, pc = "http://www.w3.org/2000/svg", hc = "http://www.w3.org/1998/Math/MathML", Pt = typeof document < "u" ? document : null, Zl = Pt && /* @__PURE__ */ Pt.createElement("template"), gc = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, l) => {
    const i = t === "svg" ? Pt.createElementNS(pc, e) : t === "mathml" ? Pt.createElementNS(hc, e) : s ? Pt.createElement(e, { is: s }) : Pt.createElement(e);
    return e === "select" && l && l.multiple != null && i.setAttribute("multiple", l.multiple), i;
  },
  createText: (e) => Pt.createTextNode(e),
  createComment: (e) => Pt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Pt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, l, i, r) {
    const c = s ? s.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), s), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      Zl.innerHTML = Ji(
        l === "svg" ? `<svg>${e}</svg>` : l === "mathml" ? `<math>${e}</math>` : e
      );
      const u = Zl.content;
      if (l === "svg" || l === "mathml") {
        const d = u.firstChild;
        for (; d.firstChild; )
          u.appendChild(d.firstChild);
        u.removeChild(d);
      }
      t.insertBefore(u, s);
    }
    return [
      // first
      c ? c.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, _c = /* @__PURE__ */ Symbol("_vtc");
function mc(e, t, s) {
  const l = e[_c];
  l && (t = (t ? [t, ...l] : [...l]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Xl = /* @__PURE__ */ Symbol("_vod"), bc = /* @__PURE__ */ Symbol("_vsh"), vc = /* @__PURE__ */ Symbol(""), yc = /(?:^|;)\s*display\s*:/;
function wc(e, t, s) {
  const l = e.style, i = Ve(s);
  let r = !1;
  if (s && !i) {
    if (t)
      if (Ve(t))
        for (const c of t.split(";")) {
          const u = c.slice(0, c.indexOf(":")).trim();
          s[u] == null && Js(l, u, "");
        }
      else
        for (const c in t)
          s[c] == null && Js(l, c, "");
    for (const c in s)
      c === "display" && (r = !0), Js(l, c, s[c]);
  } else if (i) {
    if (t !== s) {
      const c = l[vc];
      c && (s += ";" + c), l.cssText = s, r = yc.test(s);
    }
  } else t && e.removeAttribute("style");
  Xl in e && (e[Xl] = r ? l.display : "", e[bc] && (l.display = "none"));
}
const ea = /\s*!important$/;
function Js(e, t, s) {
  if (me(s))
    s.forEach((l) => Js(e, t, l));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const l = $c(e, t);
    ea.test(s) ? e.setProperty(
      qt(l),
      s.replace(ea, ""),
      "important"
    ) : e[l] = s;
  }
}
const ta = ["Webkit", "Moz", "ms"], Mn = {};
function $c(e, t) {
  const s = Mn[t];
  if (s)
    return s;
  let l = pt(t);
  if (l !== "filter" && l in e)
    return Mn[t] = l;
  l = Ba(l);
  for (let i = 0; i < ta.length; i++) {
    const r = ta[i] + l;
    if (r in e)
      return Mn[t] = r;
  }
  return t;
}
const sa = "http://www.w3.org/1999/xlink";
function na(e, t, s, l, i, r = Eo(t)) {
  l && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(sa, t.slice(6, t.length)) : e.setAttributeNS(sa, t, s) : s == null || r && !ja(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : gt(s) ? String(s) : s
  );
}
function la(e, t, s, l, i) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Ji(s) : s);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const u = r === "OPTION" ? e.getAttribute("value") || "" : e.value, d = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (u !== d || !("_value" in e)) && (e.value = d), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let c = !1;
  if (s === "" || s == null) {
    const u = typeof e[t];
    u === "boolean" ? s = ja(s) : s == null && u === "string" ? (s = "", c = !0) : u === "number" && (s = 0, c = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  c && e.removeAttribute(i || t);
}
function Nt(e, t, s, l) {
  e.addEventListener(t, s, l);
}
function kc(e, t, s, l) {
  e.removeEventListener(t, s, l);
}
const aa = /* @__PURE__ */ Symbol("_vei");
function Sc(e, t, s, l, i = null) {
  const r = e[aa] || (e[aa] = {}), c = r[t];
  if (l && c)
    c.value = l;
  else {
    const [u, d] = Cc(t);
    if (l) {
      const g = r[t] = Ec(
        l,
        i
      );
      Nt(e, u, g, d);
    } else c && (kc(e, u, c, d), r[t] = void 0);
  }
}
const ia = /(?:Once|Passive|Capture)$/;
function Cc(e) {
  let t;
  if (ia.test(e)) {
    t = {};
    let l;
    for (; l = e.match(ia); )
      e = e.slice(0, e.length - l[0].length), t[l[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : qt(e.slice(2)), t];
}
let In = 0;
const xc = /* @__PURE__ */ Promise.resolve(), Rc = () => In || (xc.then(() => In = 0), In = Date.now());
function Ec(e, t) {
  const s = (l) => {
    if (!l._vts)
      l._vts = Date.now();
    else if (l._vts <= s.attached)
      return;
    Et(
      Tc(l, s.value),
      t,
      5,
      [l]
    );
  };
  return s.value = e, s.attached = Rc(), s;
}
function Tc(e, t) {
  if (me(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (l) => (i) => !i._stopped && l && l(i)
    );
  } else
    return t;
}
const oa = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ac = (e, t, s, l, i, r) => {
  const c = i === "svg";
  t === "class" ? mc(e, l, c) : t === "style" ? wc(e, s, l) : an(t) ? al(t) || Sc(e, t, s, l, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Pc(e, t, l, c)) ? (la(e, t, l), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && na(e, t, l, c, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Oc(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !Ve(l))) ? la(e, pt(t), l, r, t) : (t === "true-value" ? e._trueValue = l : t === "false-value" && (e._falseValue = l), na(e, t, l, c));
};
function Pc(e, t, s, l) {
  if (l)
    return !!(t === "innerHTML" || t === "textContent" || t in e && oa(t) && ye(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return oa(t) && Ve(s) ? !1 : t in e;
}
function Oc(e, t) {
  const s = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!s)
    return !1;
  const l = pt(t);
  return Array.isArray(s) ? s.some((i) => pt(i) === l) : Object.keys(s).some((i) => pt(i) === l);
}
const zt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return me(t) ? (s) => Ks(t, s) : t;
};
function Mc(e) {
  e.target.composing = !0;
}
function ra(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const dt = /* @__PURE__ */ Symbol("_assign");
function ca(e, t, s) {
  return t && (e = e.trim()), s && (e = cn(e)), e;
}
const Ne = {
  created(e, { modifiers: { lazy: t, trim: s, number: l } }, i) {
    e[dt] = zt(i);
    const r = l || i.props && i.props.type === "number";
    Nt(e, t ? "change" : "input", (c) => {
      c.target.composing || e[dt](ca(e.value, s, r));
    }), (s || r) && Nt(e, "change", () => {
      e.value = ca(e.value, s, r);
    }), t || (Nt(e, "compositionstart", Mc), Nt(e, "compositionend", ra), Nt(e, "change", ra));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: l, trim: i, number: r } }, c) {
    if (e[dt] = zt(c), e.composing) return;
    const u = (r || e.type === "number") && !/^0\d/.test(e.value) ? cn(e.value) : e.value, d = t ?? "";
    u !== d && (document.activeElement === e && e.type !== "range" && (l && t === s || i && e.value.trim() === d) || (e.value = d));
  }
}, as = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, s) {
    e[dt] = zt(s), Nt(e, "change", () => {
      const l = e._modelValue, i = fs(e), r = e.checked, c = e[dt];
      if (me(l)) {
        const u = rl(l, i), d = u !== -1;
        if (r && !d)
          c(l.concat(i));
        else if (!r && d) {
          const g = [...l];
          g.splice(u, 1), c(g);
        }
      } else if (gs(l)) {
        const u = new Set(l);
        r ? u.add(i) : u.delete(i), c(u);
      } else
        c(Qi(e, r));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: ua,
  beforeUpdate(e, t, s) {
    e[dt] = zt(s), ua(e, t, s);
  }
};
function ua(e, { value: t, oldValue: s }, l) {
  e._modelValue = t;
  let i;
  if (me(t))
    i = rl(t, l.props.value) > -1;
  else if (gs(t))
    i = t.has(l.props.value);
  else {
    if (t === s) return;
    i = Kt(t, Qi(e, !0));
  }
  e.checked !== i && (e.checked = i);
}
const Ic = {
  created(e, { value: t }, s) {
    e.checked = Kt(t, s.props.value), e[dt] = zt(s), Nt(e, "change", () => {
      e[dt](fs(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: s }, l) {
    e[dt] = zt(l), t !== s && (e.checked = Kt(t, l.props.value));
  }
}, ft = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: s } }, l) {
    const i = gs(t);
    Nt(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (c) => c.selected).map(
        (c) => s ? cn(fs(c)) : fs(c)
      );
      e[dt](
        e.multiple ? i ? new Set(r) : r : r[0]
      ), e._assigning = !0, hn(() => {
        e._assigning = !1;
      });
    }), e[dt] = zt(l);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    da(e, t);
  },
  beforeUpdate(e, t, s) {
    e[dt] = zt(s);
  },
  updated(e, { value: t }) {
    e._assigning || da(e, t);
  }
};
function da(e, t) {
  const s = e.multiple, l = me(t);
  if (!(s && !l && !gs(t))) {
    for (let i = 0, r = e.options.length; i < r; i++) {
      const c = e.options[i], u = fs(c);
      if (s)
        if (l) {
          const d = typeof u;
          d === "string" || d === "number" ? c.selected = t.some((g) => String(g) === String(u)) : c.selected = rl(t, u) > -1;
        } else
          c.selected = t.has(u);
      else if (Kt(fs(c), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !s && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function fs(e) {
  return "_value" in e ? e._value : e.value;
}
function Qi(e, t) {
  const s = t ? "_trueValue" : "_falseValue";
  return s in e ? e[s] : t;
}
const Nc = {
  created(e, t, s) {
    js(e, t, s, null, "created");
  },
  mounted(e, t, s) {
    js(e, t, s, null, "mounted");
  },
  beforeUpdate(e, t, s, l) {
    js(e, t, s, l, "beforeUpdate");
  },
  updated(e, t, s, l) {
    js(e, t, s, l, "updated");
  }
};
function Dc(e, t) {
  switch (e) {
    case "SELECT":
      return ft;
    case "TEXTAREA":
      return Ne;
    default:
      switch (t) {
        case "checkbox":
          return as;
        case "radio":
          return Ic;
        default:
          return Ne;
      }
  }
}
function js(e, t, s, l, i) {
  const c = Dc(
    e.tagName,
    s.props && s.props.type
  )[i];
  c && c(e, t, s, l);
}
const Lc = ["ctrl", "shift", "alt", "meta"], Fc = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Lc.some((s) => e[`${s}Key`] && !t.includes(s))
}, _s = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), l = t.join(".");
  return s[l] || (s[l] = (i, ...r) => {
    for (let c = 0; c < t.length; c++) {
      const u = Fc[t[c]];
      if (u && u(i, t)) return;
    }
    return e(i, ...r);
  });
}, Uc = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Vc = (e, t) => {
  const s = e._withKeys || (e._withKeys = {}), l = t.join(".");
  return s[l] || (s[l] = (i) => {
    if (!("key" in i))
      return;
    const r = qt(i.key);
    if (t.some(
      (c) => c === r || Uc[c] === r
    ))
      return e(i);
  });
}, Gc = /* @__PURE__ */ Ke({ patchProp: Ac }, gc);
let fa;
function Bc() {
  return fa || (fa = Jr(Gc));
}
const Hc = (...e) => {
  const t = Bc().createApp(...e), { mount: s } = t;
  return t.mount = (l) => {
    const i = Wc(l);
    if (!i) return;
    const r = t._component;
    !ye(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const c = s(i, !1, jc(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), c;
  }, t;
};
function jc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Wc(e) {
  return Ve(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Yi;
const vn = (e) => Yi = e, Zi = (
  /* istanbul ignore next */
  Symbol()
);
function Qn(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Es;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Es || (Es = {}));
function Kc() {
  const e = qa(!0), t = e.run(() => /* @__PURE__ */ H({}));
  let s = [], l = [];
  const i = gl({
    install(r) {
      vn(i), i._a = r, r.provide(Zi, i), r.config.globalProperties.$pinia = i, l.forEach((c) => s.push(c)), l = [];
    },
    use(r) {
      return this._a ? s.push(r) : l.push(r), this;
    },
    _p: s,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return i;
}
const Xi = () => {
};
function pa(e, t, s, l = Xi) {
  e.push(t);
  const i = () => {
    const r = e.indexOf(t);
    r > -1 && (e.splice(r, 1), l());
  };
  return !s && Ja() && Ao(i), i;
}
function ss(e, ...t) {
  e.slice().forEach((s) => {
    s(...t);
  });
}
const zc = (e) => e(), ha = Symbol(), Nn = Symbol();
function Yn(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((s, l) => e.set(l, s)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const s in t) {
    if (!t.hasOwnProperty(s))
      continue;
    const l = t[s], i = e[s];
    Qn(i) && Qn(l) && e.hasOwnProperty(s) && !/* @__PURE__ */ Fe(l) && !/* @__PURE__ */ Rt(l) ? e[s] = Yn(i, l) : e[s] = l;
  }
  return e;
}
const qc = (
  /* istanbul ignore next */
  Symbol()
);
function Jc(e) {
  return !Qn(e) || !e.hasOwnProperty(qc);
}
const { assign: Ht } = Object;
function Qc(e) {
  return !!(/* @__PURE__ */ Fe(e) && e.effect);
}
function Yc(e, t, s, l) {
  const { state: i, actions: r, getters: c } = t, u = s.state.value[e];
  let d;
  function g() {
    u || (s.state.value[e] = i ? i() : {});
    const f = /* @__PURE__ */ Xo(s.state.value[e]);
    return Ht(f, r, Object.keys(c || {}).reduce((p, h) => (p[h] = gl(z(() => {
      vn(s);
      const _ = s._s.get(e);
      return c[h].call(_, _);
    })), p), {}));
  }
  return d = eo(e, g, t, s, l, !0), d;
}
function eo(e, t, s = {}, l, i, r) {
  let c;
  const u = Ht({ actions: {} }, s), d = { deep: !0 };
  let g, f, p = [], h = [], _;
  const $ = l.state.value[e];
  !r && !$ && (l.state.value[e] = {});
  let x;
  function j(y) {
    let C;
    g = f = !1, typeof y == "function" ? (y(l.state.value[e]), C = {
      type: Es.patchFunction,
      storeId: e,
      events: _
    }) : (Yn(l.state.value[e], y), C = {
      type: Es.patchObject,
      payload: y,
      storeId: e,
      events: _
    });
    const A = x = Symbol();
    hn().then(() => {
      x === A && (g = !0);
    }), f = !0, ss(p, C, l.state.value[e]);
  }
  const V = r ? function() {
    const { state: C } = s, A = C ? C() : {};
    this.$patch((ce) => {
      Ht(ce, A);
    });
  } : (
    /* istanbul ignore next */
    Xi
  );
  function F() {
    c.stop(), p = [], h = [], l._s.delete(e);
  }
  const W = (y, C = "") => {
    if (ha in y)
      return y[Nn] = C, y;
    const A = function() {
      vn(l);
      const ce = Array.from(arguments), re = [], pe = [];
      function Re(k) {
        re.push(k);
      }
      function Ee(k) {
        pe.push(k);
      }
      ss(h, {
        args: ce,
        name: A[Nn],
        store: Z,
        after: Re,
        onError: Ee
      });
      let G;
      try {
        G = y.apply(this && this.$id === e ? this : Z, ce);
      } catch (k) {
        throw ss(pe, k), k;
      }
      return G instanceof Promise ? G.then((k) => (ss(re, k), k)).catch((k) => (ss(pe, k), Promise.reject(k))) : (ss(re, G), G);
    };
    return A[ha] = !0, A[Nn] = C, A;
  }, N = {
    _p: l,
    // _s: scope,
    $id: e,
    $onAction: pa.bind(null, h),
    $patch: j,
    $reset: V,
    $subscribe(y, C = {}) {
      const A = pa(p, y, C.detached, () => ce()), ce = c.run(() => Pe(() => l.state.value[e], (re) => {
        (C.flush === "sync" ? f : g) && y({
          storeId: e,
          type: Es.direct,
          events: _
        }, re);
      }, Ht({}, d, C)));
      return A;
    },
    $dispose: F
  }, Z = /* @__PURE__ */ Ft(N);
  l._s.set(e, Z);
  const T = (l._a && l._a.runWithContext || zc)(() => l._e.run(() => (c = qa()).run(() => t({ action: W }))));
  for (const y in T) {
    const C = T[y];
    if (/* @__PURE__ */ Fe(C) && !Qc(C) || /* @__PURE__ */ Rt(C))
      r || ($ && Jc(C) && (/* @__PURE__ */ Fe(C) ? C.value = $[y] : Yn(C, $[y])), l.state.value[e][y] = C);
    else if (typeof C == "function") {
      const A = W(C, y);
      T[y] = A, u.actions[y] = C;
    }
  }
  return Ht(Z, T), Ht(/* @__PURE__ */ Ce(Z), T), Object.defineProperty(Z, "$state", {
    get: () => l.state.value[e],
    set: (y) => {
      j((C) => {
        Ht(C, y);
      });
    }
  }), l._p.forEach((y) => {
    Ht(Z, c.run(() => y({
      store: Z,
      app: l._a,
      pinia: l,
      options: u
    })));
  }), $ && r && s.hydrate && s.hydrate(Z.$state, $), g = !0, f = !0, Z;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function yn(e, t, s) {
  let l, i;
  const r = typeof t == "function";
  typeof e == "string" ? (l = e, i = r ? s : t) : (i = e, l = e.id);
  function c(u, d) {
    const g = ur();
    return u = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    u || (g ? ut(Zi, null) : null), u && vn(u), u = Yi, u._s.has(l) || (r ? eo(l, t, i, u) : Yc(l, i, u)), u._s.get(l);
  }
  return c.$id = l, c;
}
function to(e) {
  {
    const t = /* @__PURE__ */ Ce(e), s = {};
    for (const l in t) {
      const i = t[l];
      i.effect ? s[l] = // ...
      z({
        get: () => e[l],
        set(r) {
          e[l] = r;
        }
      }) : (/* @__PURE__ */ Fe(i) || /* @__PURE__ */ Rt(i)) && (s[l] = // ---
      /* @__PURE__ */ sr(e, l));
    }
    return s;
  }
}
const kl = "openclaw-guard.auth-token", Zn = "openclaw-guard:unauthorized";
function so() {
  return typeof window > "u" ? null : window.localStorage.getItem(kl);
}
function Zc(e) {
  typeof window > "u" || window.localStorage.setItem(kl, e);
}
function no() {
  typeof window > "u" || window.localStorage.removeItem(kl);
}
function Xc() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Zn));
}
function eu(e) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Zn, e), () => window.removeEventListener(Zn, e));
}
async function tu(e) {
  if ((e.headers.get("content-type") || "").includes("application/json"))
    try {
      const l = await e.json();
      return l.message || l.error || `Request failed with ${e.status}`;
    } catch {
      return `Request failed with ${e.status}`;
    }
  return await e.text() || `Request failed with ${e.status}`;
}
async function Sl(e, t = {}) {
  const s = new Headers(t.headers);
  s.set("Accept", "application/json");
  let l = !1;
  if (!s.has("Authorization")) {
    const c = so();
    c && (s.set("Authorization", `Bearer ${c}`), l = !0);
  }
  let i = t.body;
  i && typeof i == "object" && !(i instanceof FormData) && !(i instanceof URLSearchParams) && !(i instanceof Blob) && (s.set("Content-Type", "application/json"), i = JSON.stringify(i));
  const r = await fetch(e, {
    ...t,
    headers: s,
    body: i
  });
  if (!r.ok)
    throw r.status === 401 && l && (no(), Xc()), new Error(await tu(r));
  return r.json();
}
function xe(e) {
  return Sl(e);
}
function De(e, t) {
  return Sl(e, {
    method: "POST",
    body: t
  });
}
function lo(e) {
  return Sl(e, {
    method: "DELETE"
  });
}
async function su() {
  return xe("/api/auth/status");
}
async function nu() {
  return xe("/api/info");
}
async function lu(e) {
  return De("/api/auth/login", { password: e });
}
async function au() {
  return De("/api/auth/logout", {});
}
async function iu(e, t) {
  return De("/api/auth/change-password", {
    currentPassword: e,
    newPassword: t
  });
}
const wn = /* @__PURE__ */ yn("auth", () => {
  const e = /* @__PURE__ */ H(!1), t = /* @__PURE__ */ H(!1), s = /* @__PURE__ */ H(!0), l = /* @__PURE__ */ H(!1), i = /* @__PURE__ */ H(!1), r = /* @__PURE__ */ H(null), c = /* @__PURE__ */ H("openclaw-guard auth show-password"), u = /* @__PURE__ */ H(!1), d = /* @__PURE__ */ H(!1), g = z(() => e.value && s.value && !u.value);
  function f() {
    no(), u.value = !1, d.value = !1;
  }
  async function p() {
    if (!(t.value || e.value)) {
      t.value = !0;
      try {
        const F = await su();
        if (s.value = F.enabled, l.value = F.configured, i.value = F.initialPasswordAvailable, r.value = F.initialPasswordCreatedAt, c.value = F.revealCommand || c.value, !F.enabled) {
          u.value = !0;
          return;
        }
        if (!so()) {
          f();
          return;
        }
        try {
          await nu(), u.value = !0;
        } catch {
          f();
        }
      } finally {
        e.value = !0, t.value = !1;
      }
    }
  }
  async function h(F) {
    const W = await lu(F);
    return W.token && (Zc(W.token), u.value = !0), W;
  }
  async function _() {
    try {
      await au();
    } catch {
    } finally {
      f();
    }
  }
  async function $(F, W) {
    const N = await iu(F, W);
    if (!N.success)
      throw new Error(N.error || "Password update failed");
    return f(), N;
  }
  function x() {
    d.value = !0;
  }
  function j() {
    d.value = !1;
  }
  function V() {
    s.value && f();
  }
  return {
    ready: e,
    bootstrapping: t,
    authEnabled: s,
    configured: l,
    initialPasswordAvailable: i,
    initialPasswordCreatedAt: r,
    revealCommand: c,
    authenticated: u,
    requiresLogin: g,
    changePasswordOpen: d,
    hydrate: p,
    login: h,
    logout: _,
    changePassword: $,
    openChangePassword: x,
    closeChangePassword: j,
    handleUnauthorized: V
  };
});
let ou = 0;
const it = /* @__PURE__ */ yn("feedback", () => {
  const e = /* @__PURE__ */ H([]), t = /* @__PURE__ */ H(null);
  let s = null;
  function l(u) {
    const d = {
      id: ++ou,
      title: u.title,
      message: u.message,
      tone: u.tone || "info"
    };
    e.value.push(d);
    const g = typeof u.durationMs == "number" ? u.durationMs : 3600;
    return typeof window < "u" && g > 0 && window.setTimeout(() => i(d.id), g), d.id;
  }
  function i(u) {
    e.value = e.value.filter((d) => d.id !== u);
  }
  function r(u) {
    return s && (s(!1), s = null), t.value = {
      title: u.title,
      message: u.message,
      confirmLabel: u.confirmLabel || "Confirm",
      cancelLabel: u.cancelLabel || "Cancel",
      tone: u.tone || "default"
    }, new Promise((d) => {
      s = d;
    });
  }
  function c(u) {
    const d = s;
    s = null, t.value = null, d == null || d(u);
  }
  return {
    toasts: e,
    confirmRequest: t,
    pushToast: l,
    dismissToast: i,
    confirm: r,
    resolveConfirm: c
  };
}), ga = "openclaw-guard.theme", _a = "openclaw-guard.lang", ma = "openclaw-guard.developer-mode";
function ru() {
  return typeof window > "u" ? "dark" : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
const je = /* @__PURE__ */ yn("ui", () => {
  const e = /* @__PURE__ */ H("auto"), t = /* @__PURE__ */ H("zh"), s = /* @__PURE__ */ H(!1), l = /* @__PURE__ */ H(!1), i = z(() => e.value === "auto" ? ru() : e.value);
  function r() {
    typeof document > "u" || (document.documentElement.dataset.theme = i.value, document.documentElement.lang = t.value === "zh" ? "zh-CN" : "en", document.documentElement.dataset.developerMode = s.value ? "on" : "off");
  }
  function c() {
    if (l.value || typeof window > "u") {
      r();
      return;
    }
    const p = window.localStorage.getItem(ga), h = window.localStorage.getItem(_a), _ = window.localStorage.getItem(ma);
    (p === "auto" || p === "light" || p === "dark") && (e.value = p), (h === "zh" || h === "en") && (t.value = h), s.value = _ === "1", l.value = !0, r();
  }
  function u(p) {
    e.value = p, typeof window < "u" && window.localStorage.setItem(ga, p), r();
  }
  function d(p) {
    t.value = p, typeof window < "u" && window.localStorage.setItem(_a, p), r();
  }
  function g(p) {
    s.value = p, typeof window < "u" && window.localStorage.setItem(ma, p ? "1" : "0"), r();
  }
  function f(p, h) {
    return t.value === "zh" ? p : h;
  }
  return {
    themePreference: e,
    language: t,
    developerMode: s,
    resolvedTheme: i,
    hydrate: c,
    setThemePreference: u,
    setLanguage: d,
    setDeveloperMode: g,
    applyDocumentState: r,
    label: f
  };
}), cu = { class: "confirm-dialog auth-dialog" }, uu = { class: "confirm-dialog__header" }, du = { class: "page-card__eyebrow" }, fu = { class: "page-card__title" }, pu = { class: "auth-dialog__body" }, hu = { class: "field-stack" }, gu = { class: "field-stack" }, _u = { class: "field-stack" }, mu = { class: "login-note" }, bu = {
  key: 0,
  class: "login-error"
}, vu = { class: "confirm-dialog__footer" }, yu = ["disabled"], wu = /* @__PURE__ */ Le({
  __name: "ChangePasswordDialog",
  setup(e) {
    const t = je(), s = wn(), l = it(), i = /* @__PURE__ */ H(""), r = /* @__PURE__ */ H(""), c = /* @__PURE__ */ H(""), u = /* @__PURE__ */ H(!1), d = /* @__PURE__ */ H("");
    function g() {
      i.value = "", r.value = "", c.value = "", d.value = "", u.value = !1;
    }
    function f() {
      g(), s.closeChangePassword();
    }
    async function p() {
      if (!i.value || !r.value) {
        d.value = t.label("请先填写当前密码和新密码。", "Enter the current password and the new password first.");
        return;
      }
      if (r.value.length < 6) {
        d.value = t.label("新密码至少需要 6 位。", "The new password must be at least 6 characters long.");
        return;
      }
      if (r.value !== c.value) {
        d.value = t.label("两次输入的新密码不一致。", "The new passwords do not match.");
        return;
      }
      u.value = !0, d.value = "";
      try {
        await s.changePassword(i.value, r.value), f(), l.pushToast({
          tone: "success",
          title: t.label("密码已更新", "Password updated"),
          message: t.label("当前会话已失效，请使用新密码重新登录。", "The current session has been cleared. Sign in again with the new password.")
        });
      } catch (h) {
        d.value = h instanceof Error ? h.message : String(h), u.value = !1;
      }
    }
    return (h, _) => a(s).changePasswordOpen ? (m(), v("div", {
      key: 0,
      class: "confirm-backdrop",
      onClick: _s(f, ["self"])
    }, [
      n("section", cu, [
        n("header", uu, [
          n("p", du, o(a(t).label("账号安全", "Account security")), 1),
          n("h2", fu, o(a(t).label("修改访问密码", "Change access password")), 1)
        ]),
        n("div", pu, [
          n("label", hu, [
            n("span", null, o(a(t).label("当前密码", "Current password")), 1),
            $e(n("input", {
              "onUpdate:modelValue": _[0] || (_[0] = ($) => i.value = $),
              class: "input-field",
              type: "password",
              autocomplete: "current-password"
            }, null, 512), [
              [Ne, i.value]
            ])
          ]),
          n("label", gu, [
            n("span", null, o(a(t).label("新密码", "New password")), 1),
            $e(n("input", {
              "onUpdate:modelValue": _[1] || (_[1] = ($) => r.value = $),
              class: "input-field",
              type: "password",
              autocomplete: "new-password"
            }, null, 512), [
              [Ne, r.value]
            ])
          ]),
          n("label", _u, [
            n("span", null, o(a(t).label("确认新密码", "Confirm new password")), 1),
            $e(n("input", {
              "onUpdate:modelValue": _[2] || (_[2] = ($) => c.value = $),
              class: "input-field",
              type: "password",
              autocomplete: "new-password"
            }, null, 512), [
              [Ne, c.value]
            ])
          ]),
          n("p", mu, o(a(t).label("修改成功后，Guard 会自动让当前登录会话失效，防止旧凭证继续可用。", "After the password changes, Guard automatically invalidates the current session so the old credential cannot keep running.")), 1),
          d.value ? (m(), v("p", bu, o(d.value), 1)) : ue("", !0)
        ]),
        n("footer", vu, [
          n("button", {
            class: "inline-link",
            type: "button",
            onClick: f
          }, o(a(t).label("取消", "Cancel")), 1),
          n("button", {
            class: "inline-link inline-link--primary",
            type: "button",
            disabled: u.value,
            onClick: p
          }, o(u.value ? a(t).label("更新中…", "Updating…") : a(t).label("确认修改", "Update password")), 9, yu)
        ])
      ])
    ])) : ue("", !0);
  }
}), $u = { class: "login-screen" }, ku = { class: "login-card" }, Su = { class: "login-card__copy" }, Cu = { class: "page-card__eyebrow" }, xu = { class: "page-card__title" }, Ru = { class: "muted-copy" }, Eu = { class: "field-stack" }, Tu = ["placeholder"], Au = { class: "login-note" }, Pu = {
  key: 0,
  class: "login-command"
}, Ou = {
  key: 1,
  class: "login-error"
}, Mu = ["disabled"], Iu = "/ui/logo.png", Nu = /* @__PURE__ */ Le({
  __name: "LoginPage",
  setup(e) {
    const t = je(), s = wn(), l = /* @__PURE__ */ H(""), i = /* @__PURE__ */ H(!1), r = /* @__PURE__ */ H(""), c = z(() => s.initialPasswordAvailable ? t.label(
      "如果忘记当前登录密码，可以在本机终端重新查看。",
      "If you forget the current password, you can reveal it again from a local terminal."
    ) : t.label(
      "如果这是较早版本创建的环境，旧版本可能已经删掉了密码回看记录。",
      "If this environment was created by an older Guard version, the reveal record may already have been removed."
    ));
    async function u() {
      if (!l.value.trim()) {
        r.value = t.label("请输入访问密码。", "Enter the access password.");
        return;
      }
      i.value = !0, r.value = "";
      try {
        await s.login(l.value.trim()), l.value = "";
      } catch (d) {
        r.value = d instanceof Error ? d.message : String(d);
      } finally {
        i.value = !1;
      }
    }
    return (d, g) => (m(), v("div", $u, [
      n("section", ku, [
        n("div", { class: "login-card__brand" }, [
          n("img", {
            class: "login-card__logo",
            src: Iu,
            alt: "OpenClaw Guard"
          }),
          g[1] || (g[1] = n("div", null, [
            n("p", { class: "brand-lockup__eyebrow" }, "OpenClaw Guard Next"),
            n("h1", { class: "brand-lockup__title" }, "OpenClaw Guard")
          ], -1))
        ]),
        n("div", Su, [
          n("p", Cu, o(a(t).label("安全登录", "Secure Sign-in")), 1),
          n("h2", xu, o(a(t).label("输入本机访问密码", "Enter the local access password")), 1),
          n("p", Ru, o(a(t).label("先完成登录，再进入新的模块化控制台。主题、语言和页面结构会沿用到后续生产替换。", "Sign in first to enter the modular console. Theme, language, and structure here are the base for the production cutover.")), 1)
        ]),
        n("form", {
          class: "login-form",
          onSubmit: _s(u, ["prevent"])
        }, [
          n("label", Eu, [
            n("span", null, o(a(t).label("访问密码", "Access password")), 1),
            $e(n("input", {
              "onUpdate:modelValue": g[0] || (g[0] = (f) => l.value = f),
              class: "input-field",
              type: "password",
              autocomplete: "current-password",
              placeholder: a(t).label("请输入 Guard 登录密码", "Enter the Guard password")
            }, null, 8, Tu), [
              [Ne, l.value]
            ])
          ]),
          n("p", Au, o(c.value), 1),
          a(s).initialPasswordAvailable ? (m(), v("div", Pu, [
            n("span", null, o(a(t).label("回看命令", "Reveal command")), 1),
            n("code", null, o(a(s).revealCommand), 1)
          ])) : ue("", !0),
          r.value ? (m(), v("p", Ou, o(r.value), 1)) : ue("", !0),
          n("button", {
            class: "inline-link inline-link--primary login-submit",
            type: "submit",
            disabled: i.value
          }, o(i.value ? a(t).label("登录中…", "Signing in…") : a(t).label("进入控制台", "Open console")), 9, Mu)
        ], 32)
      ])
    ]));
  }
}), Du = { class: "confirm-dialog__header" }, Lu = { class: "page-card__title" }, Fu = { class: "confirm-dialog__body" }, Uu = { class: "confirm-dialog__footer" }, Vu = /* @__PURE__ */ Le({
  __name: "ConfirmDialog",
  setup(e) {
    const t = it(), { confirmRequest: s } = to(t), l = z(() => !!s.value);
    return (i, r) => {
      var c, u, d, g, f, p;
      return l.value ? (m(), v("div", {
        key: 0,
        class: "confirm-backdrop",
        onClick: r[2] || (r[2] = _s((h) => a(t).resolveConfirm(!1), ["self"]))
      }, [
        n("section", {
          class: _e(["confirm-dialog", { "confirm-dialog--danger": ((c = a(s)) == null ? void 0 : c.tone) === "danger" }])
        }, [
          n("header", Du, [
            r[3] || (r[3] = n("p", { class: "page-card__eyebrow" }, "Confirm", -1)),
            n("h2", Lu, o((u = a(s)) == null ? void 0 : u.title), 1)
          ]),
          n("p", Fu, o((d = a(s)) == null ? void 0 : d.message), 1),
          n("footer", Uu, [
            n("button", {
              class: "inline-link",
              type: "button",
              onClick: r[0] || (r[0] = (h) => a(t).resolveConfirm(!1))
            }, o((g = a(s)) == null ? void 0 : g.cancelLabel), 1),
            n("button", {
              class: _e(["inline-link", { "inline-link--danger": ((f = a(s)) == null ? void 0 : f.tone) === "danger" }]),
              type: "button",
              onClick: r[1] || (r[1] = (h) => a(t).resolveConfirm(!0))
            }, o((p = a(s)) == null ? void 0 : p.confirmLabel), 3)
          ])
        ], 2)
      ])) : ue("", !0);
    };
  }
}), Gu = {
  class: "toast-viewport",
  "aria-live": "polite",
  "aria-atomic": "true"
}, Bu = { class: "toast-card__content" }, Hu = { key: 0 }, ju = ["onClick"], Wu = /* @__PURE__ */ Le({
  __name: "ToastViewport",
  setup(e) {
    const t = it(), { toasts: s } = to(t);
    return (l, i) => (m(), v("div", Gu, [
      (m(!0), v(Y, null, we(a(s), (r) => (m(), v("article", {
        key: r.id,
        class: _e(["toast-card", `toast-card--${r.tone}`])
      }, [
        n("div", Bu, [
          r.title ? (m(), v("strong", Hu, o(r.title), 1)) : ue("", !0),
          n("p", null, o(r.message), 1)
        ]),
        n("button", {
          class: "toast-card__close",
          type: "button",
          onClick: (c) => a(t).dismissToast(r.id)
        }, " × ", 8, ju)
      ], 2))), 128))
    ]));
  }
});
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const ls = typeof document < "u";
function ao(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function Ku(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && ao(e.default);
}
const Te = Object.assign;
function Dn(e, t) {
  const s = {};
  for (const l in t) {
    const i = t[l];
    s[l] = mt(i) ? i.map(e) : e(i);
  }
  return s;
}
const Ts = () => {
}, mt = Array.isArray;
function ba(e, t) {
  const s = {};
  for (const l in e) s[l] = l in t ? t[l] : e[l];
  return s;
}
const io = /#/g, zu = /&/g, qu = /\//g, Ju = /=/g, Qu = /\?/g, oo = /\+/g, Yu = /%5B/g, Zu = /%5D/g, ro = /%5E/g, Xu = /%60/g, co = /%7B/g, ed = /%7C/g, uo = /%7D/g, td = /%20/g;
function Cl(e) {
  return e == null ? "" : encodeURI("" + e).replace(ed, "|").replace(Yu, "[").replace(Zu, "]");
}
function sd(e) {
  return Cl(e).replace(co, "{").replace(uo, "}").replace(ro, "^");
}
function Xn(e) {
  return Cl(e).replace(oo, "%2B").replace(td, "+").replace(io, "%23").replace(zu, "%26").replace(Xu, "`").replace(co, "{").replace(uo, "}").replace(ro, "^");
}
function nd(e) {
  return Xn(e).replace(Ju, "%3D");
}
function ld(e) {
  return Cl(e).replace(io, "%23").replace(Qu, "%3F");
}
function ad(e) {
  return ld(e).replace(qu, "%2F");
}
function Ls(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {
  }
  return "" + e;
}
const id = /\/$/, od = (e) => e.replace(id, "");
function Ln(e, t, s = "/") {
  let l, i = {}, r = "", c = "";
  const u = t.indexOf("#");
  let d = t.indexOf("?");
  return d = u >= 0 && d > u ? -1 : d, d >= 0 && (l = t.slice(0, d), r = t.slice(d, u > 0 ? u : t.length), i = e(r.slice(1))), u >= 0 && (l = l || t.slice(0, u), c = t.slice(u, t.length)), l = dd(l ?? t, s), {
    fullPath: l + r + c,
    path: l,
    query: i,
    hash: Ls(c)
  };
}
function rd(e, t) {
  const s = t.query ? e(t.query) : "";
  return t.path + (s && "?") + s + (t.hash || "");
}
function va(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function cd(e, t, s) {
  const l = t.matched.length - 1, i = s.matched.length - 1;
  return l > -1 && l === i && ps(t.matched[l], s.matched[i]) && fo(t.params, s.params) && e(t.query) === e(s.query) && t.hash === s.hash;
}
function ps(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function fo(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (var s in e) if (!ud(e[s], t[s])) return !1;
  return !0;
}
function ud(e, t) {
  return mt(e) ? ya(e, t) : mt(t) ? ya(t, e) : (e == null ? void 0 : e.valueOf()) === (t == null ? void 0 : t.valueOf());
}
function ya(e, t) {
  return mt(t) ? e.length === t.length && e.every((s, l) => s === t[l]) : e.length === 1 && e[0] === t;
}
function dd(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const s = t.split("/"), l = e.split("/"), i = l[l.length - 1];
  (i === ".." || i === ".") && l.push("");
  let r = s.length - 1, c, u;
  for (c = 0; c < l.length; c++)
    if (u = l[c], u !== ".")
      if (u === "..")
        r > 1 && r--;
      else break;
  return s.slice(0, r).join("/") + "/" + l.slice(c).join("/");
}
const Bt = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
let el = /* @__PURE__ */ function(e) {
  return e.pop = "pop", e.push = "push", e;
}({}), Fn = /* @__PURE__ */ function(e) {
  return e.back = "back", e.forward = "forward", e.unknown = "", e;
}({});
function fd(e) {
  if (!e) if (ls) {
    const t = document.querySelector("base");
    e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
  } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), od(e);
}
const pd = /^[^#]+#/;
function hd(e, t) {
  return e.replace(pd, "#") + t;
}
function gd(e, t) {
  const s = document.documentElement.getBoundingClientRect(), l = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: l.left - s.left - (t.left || 0),
    top: l.top - s.top - (t.top || 0)
  };
}
const $n = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function _d(e) {
  let t;
  if ("el" in e) {
    const s = e.el, l = typeof s == "string" && s.startsWith("#"), i = typeof s == "string" ? l ? document.getElementById(s.slice(1)) : document.querySelector(s) : s;
    if (!i)
      return;
    t = gd(i, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function wa(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const tl = /* @__PURE__ */ new Map();
function md(e, t) {
  tl.set(e, t);
}
function bd(e) {
  const t = tl.get(e);
  return tl.delete(e), t;
}
function vd(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function po(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let Ue = /* @__PURE__ */ function(e) {
  return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
}({});
const ho = Symbol("");
Ue.MATCHER_NOT_FOUND + "", Ue.NAVIGATION_GUARD_REDIRECT + "", Ue.NAVIGATION_ABORTED + "", Ue.NAVIGATION_CANCELLED + "", Ue.NAVIGATION_DUPLICATED + "";
function hs(e, t) {
  return Te(/* @__PURE__ */ new Error(), {
    type: e,
    [ho]: !0
  }, t);
}
function At(e, t) {
  return e instanceof Error && ho in e && (t == null || !!(e.type & t));
}
const yd = [
  "params",
  "query",
  "hash"
];
function wd(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const s of yd) s in e && (t[s] = e[s]);
  return JSON.stringify(t, null, 2);
}
function $d(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const s = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let l = 0; l < s.length; ++l) {
    const i = s[l].replace(oo, " "), r = i.indexOf("="), c = Ls(r < 0 ? i : i.slice(0, r)), u = r < 0 ? null : Ls(i.slice(r + 1));
    if (c in t) {
      let d = t[c];
      mt(d) || (d = t[c] = [d]), d.push(u);
    } else t[c] = u;
  }
  return t;
}
function $a(e) {
  let t = "";
  for (let s in e) {
    const l = e[s];
    if (s = nd(s), l == null) {
      l !== void 0 && (t += (t.length ? "&" : "") + s);
      continue;
    }
    (mt(l) ? l.map((i) => i && Xn(i)) : [l && Xn(l)]).forEach((i) => {
      i !== void 0 && (t += (t.length ? "&" : "") + s, i != null && (t += "=" + i));
    });
  }
  return t;
}
function kd(e) {
  const t = {};
  for (const s in e) {
    const l = e[s];
    l !== void 0 && (t[s] = mt(l) ? l.map((i) => i == null ? null : "" + i) : l == null ? l : "" + l);
  }
  return t;
}
const Sd = Symbol(""), ka = Symbol(""), kn = Symbol(""), xl = Symbol(""), sl = Symbol("");
function ys() {
  let e = [];
  function t(l) {
    return e.push(l), () => {
      const i = e.indexOf(l);
      i > -1 && e.splice(i, 1);
    };
  }
  function s() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: s
  };
}
function Wt(e, t, s, l, i, r = (c) => c()) {
  const c = l && (l.enterCallbacks[i] = l.enterCallbacks[i] || []);
  return () => new Promise((u, d) => {
    const g = (h) => {
      h === !1 ? d(hs(Ue.NAVIGATION_ABORTED, {
        from: s,
        to: t
      })) : h instanceof Error ? d(h) : vd(h) ? d(hs(Ue.NAVIGATION_GUARD_REDIRECT, {
        from: t,
        to: h
      })) : (c && l.enterCallbacks[i] === c && typeof h == "function" && c.push(h), u());
    }, f = r(() => e.call(l && l.instances[i], t, s, g));
    let p = Promise.resolve(f);
    e.length < 3 && (p = p.then(g)), p.catch((h) => d(h));
  });
}
function Un(e, t, s, l, i = (r) => r()) {
  const r = [];
  for (const c of e)
    for (const u in c.components) {
      let d = c.components[u];
      if (!(t !== "beforeRouteEnter" && !c.instances[u]))
        if (ao(d)) {
          const g = (d.__vccOpts || d)[t];
          g && r.push(Wt(g, s, l, c, u, i));
        } else {
          let g = d();
          r.push(() => g.then((f) => {
            if (!f) throw new Error(`Couldn't resolve component "${u}" at "${c.path}"`);
            const p = Ku(f) ? f.default : f;
            c.mods[u] = f, c.components[u] = p;
            const h = (p.__vccOpts || p)[t];
            return h && Wt(h, s, l, c, u, i)();
          }));
        }
    }
  return r;
}
function Cd(e, t) {
  const s = [], l = [], i = [], r = Math.max(t.matched.length, e.matched.length);
  for (let c = 0; c < r; c++) {
    const u = t.matched[c];
    u && (e.matched.find((g) => ps(g, u)) ? l.push(u) : s.push(u));
    const d = e.matched[c];
    d && (t.matched.find((g) => ps(g, d)) || i.push(d));
  }
  return [
    s,
    l,
    i
  ];
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let xd = () => location.protocol + "//" + location.host;
function go(e, t) {
  const { pathname: s, search: l, hash: i } = t, r = e.indexOf("#");
  if (r > -1) {
    let c = i.includes(e.slice(r)) ? e.slice(r).length : 1, u = i.slice(c);
    return u[0] !== "/" && (u = "/" + u), va(u, "");
  }
  return va(s, e) + l + i;
}
function Rd(e, t, s, l) {
  let i = [], r = [], c = null;
  const u = ({ state: h }) => {
    const _ = go(e, location), $ = s.value, x = t.value;
    let j = 0;
    if (h) {
      if (s.value = _, t.value = h, c && c === $) {
        c = null;
        return;
      }
      j = x ? h.position - x.position : 0;
    } else l(_);
    i.forEach((V) => {
      V(s.value, $, {
        delta: j,
        type: el.pop,
        direction: j ? j > 0 ? Fn.forward : Fn.back : Fn.unknown
      });
    });
  };
  function d() {
    c = s.value;
  }
  function g(h) {
    i.push(h);
    const _ = () => {
      const $ = i.indexOf(h);
      $ > -1 && i.splice($, 1);
    };
    return r.push(_), _;
  }
  function f() {
    if (document.visibilityState === "hidden") {
      const { history: h } = window;
      if (!h.state) return;
      h.replaceState(Te({}, h.state, { scroll: $n() }), "");
    }
  }
  function p() {
    for (const h of r) h();
    r = [], window.removeEventListener("popstate", u), window.removeEventListener("pagehide", f), document.removeEventListener("visibilitychange", f);
  }
  return window.addEventListener("popstate", u), window.addEventListener("pagehide", f), document.addEventListener("visibilitychange", f), {
    pauseListeners: d,
    listen: g,
    destroy: p
  };
}
function Sa(e, t, s, l = !1, i = !1) {
  return {
    back: e,
    current: t,
    forward: s,
    replaced: l,
    position: window.history.length,
    scroll: i ? $n() : null
  };
}
function Ed(e) {
  const { history: t, location: s } = window, l = { value: go(e, s) }, i = { value: t.state };
  i.value || r(l.value, {
    back: null,
    current: l.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);
  function r(d, g, f) {
    const p = e.indexOf("#"), h = p > -1 ? (s.host && document.querySelector("base") ? e : e.slice(p)) + d : xd() + e + d;
    try {
      t[f ? "replaceState" : "pushState"](g, "", h), i.value = g;
    } catch (_) {
      console.error(_), s[f ? "replace" : "assign"](h);
    }
  }
  function c(d, g) {
    r(d, Te({}, t.state, Sa(i.value.back, d, i.value.forward, !0), g, { position: i.value.position }), !0), l.value = d;
  }
  function u(d, g) {
    const f = Te({}, i.value, t.state, {
      forward: d,
      scroll: $n()
    });
    r(f.current, f, !0), r(d, Te({}, Sa(l.value, d, null), { position: f.position + 1 }, g), !1), l.value = d;
  }
  return {
    location: l,
    state: i,
    push: u,
    replace: c
  };
}
function Td(e) {
  e = fd(e);
  const t = Ed(e), s = Rd(e, t.state, t.location, t.replace);
  function l(r, c = !0) {
    c || s.pauseListeners(), history.go(r);
  }
  const i = Te({
    location: "",
    base: e,
    go: l,
    createHref: hd.bind(null, e)
  }, t, s);
  return Object.defineProperty(i, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(i, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), i;
}
function Ad(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), Td(e);
}
let Zt = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
}({});
var Be = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
}(Be || {});
const Pd = {
  type: Zt.Static,
  value: ""
}, Od = /[a-zA-Z0-9_]/;
function Md(e) {
  if (!e) return [[]];
  if (e === "/") return [[Pd]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(_) {
    throw new Error(`ERR (${s})/"${g}": ${_}`);
  }
  let s = Be.Static, l = s;
  const i = [];
  let r;
  function c() {
    r && i.push(r), r = [];
  }
  let u = 0, d, g = "", f = "";
  function p() {
    g && (s === Be.Static ? r.push({
      type: Zt.Static,
      value: g
    }) : s === Be.Param || s === Be.ParamRegExp || s === Be.ParamRegExpEnd ? (r.length > 1 && (d === "*" || d === "+") && t(`A repeatable param (${g}) must be alone in its segment. eg: '/:ids+.`), r.push({
      type: Zt.Param,
      value: g,
      regexp: f,
      repeatable: d === "*" || d === "+",
      optional: d === "*" || d === "?"
    })) : t("Invalid state to consume buffer"), g = "");
  }
  function h() {
    g += d;
  }
  for (; u < e.length; ) {
    if (d = e[u++], d === "\\" && s !== Be.ParamRegExp) {
      l = s, s = Be.EscapeNext;
      continue;
    }
    switch (s) {
      case Be.Static:
        d === "/" ? (g && p(), c()) : d === ":" ? (p(), s = Be.Param) : h();
        break;
      case Be.EscapeNext:
        h(), s = l;
        break;
      case Be.Param:
        d === "(" ? s = Be.ParamRegExp : Od.test(d) ? h() : (p(), s = Be.Static, d !== "*" && d !== "?" && d !== "+" && u--);
        break;
      case Be.ParamRegExp:
        d === ")" ? f[f.length - 1] == "\\" ? f = f.slice(0, -1) + d : s = Be.ParamRegExpEnd : f += d;
        break;
      case Be.ParamRegExpEnd:
        p(), s = Be.Static, d !== "*" && d !== "?" && d !== "+" && u--, f = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return s === Be.ParamRegExp && t(`Unfinished custom RegExp for param "${g}"`), p(), c(), i;
}
const Ca = "[^/]+?", Id = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
};
var Xe = /* @__PURE__ */ function(e) {
  return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
}(Xe || {});
const Nd = /[.+*?^${}()[\]/\\]/g;
function Dd(e, t) {
  const s = Te({}, Id, t), l = [];
  let i = s.start ? "^" : "";
  const r = [];
  for (const g of e) {
    const f = g.length ? [] : [Xe.Root];
    s.strict && !g.length && (i += "/");
    for (let p = 0; p < g.length; p++) {
      const h = g[p];
      let _ = Xe.Segment + (s.sensitive ? Xe.BonusCaseSensitive : 0);
      if (h.type === Zt.Static)
        p || (i += "/"), i += h.value.replace(Nd, "\\$&"), _ += Xe.Static;
      else if (h.type === Zt.Param) {
        const { value: $, repeatable: x, optional: j, regexp: V } = h;
        r.push({
          name: $,
          repeatable: x,
          optional: j
        });
        const F = V || Ca;
        if (F !== Ca) {
          _ += Xe.BonusCustomRegExp;
          try {
            `${F}`;
          } catch (N) {
            throw new Error(`Invalid custom RegExp for param "${$}" (${F}): ` + N.message);
          }
        }
        let W = x ? `((?:${F})(?:/(?:${F}))*)` : `(${F})`;
        p || (W = j && g.length < 2 ? `(?:/${W})` : "/" + W), j && (W += "?"), i += W, _ += Xe.Dynamic, j && (_ += Xe.BonusOptional), x && (_ += Xe.BonusRepeatable), F === ".*" && (_ += Xe.BonusWildcard);
      }
      f.push(_);
    }
    l.push(f);
  }
  if (s.strict && s.end) {
    const g = l.length - 1;
    l[g][l[g].length - 1] += Xe.BonusStrict;
  }
  s.strict || (i += "/?"), s.end ? i += "$" : s.strict && !i.endsWith("/") && (i += "(?:/|$)");
  const c = new RegExp(i, s.sensitive ? "" : "i");
  function u(g) {
    const f = g.match(c), p = {};
    if (!f) return null;
    for (let h = 1; h < f.length; h++) {
      const _ = f[h] || "", $ = r[h - 1];
      p[$.name] = _ && $.repeatable ? _.split("/") : _;
    }
    return p;
  }
  function d(g) {
    let f = "", p = !1;
    for (const h of e) {
      (!p || !f.endsWith("/")) && (f += "/"), p = !1;
      for (const _ of h) if (_.type === Zt.Static) f += _.value;
      else if (_.type === Zt.Param) {
        const { value: $, repeatable: x, optional: j } = _, V = $ in g ? g[$] : "";
        if (mt(V) && !x) throw new Error(`Provided param "${$}" is an array but it is not repeatable (* or + modifiers)`);
        const F = mt(V) ? V.join("/") : V;
        if (!F) if (j)
          h.length < 2 && (f.endsWith("/") ? f = f.slice(0, -1) : p = !0);
        else throw new Error(`Missing required param "${$}"`);
        f += F;
      }
    }
    return f || "/";
  }
  return {
    re: c,
    score: l,
    keys: r,
    parse: u,
    stringify: d
  };
}
function Ld(e, t) {
  let s = 0;
  for (; s < e.length && s < t.length; ) {
    const l = t[s] - e[s];
    if (l) return l;
    s++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === Xe.Static + Xe.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === Xe.Static + Xe.Segment ? 1 : -1 : 0;
}
function _o(e, t) {
  let s = 0;
  const l = e.score, i = t.score;
  for (; s < l.length && s < i.length; ) {
    const r = Ld(l[s], i[s]);
    if (r) return r;
    s++;
  }
  if (Math.abs(i.length - l.length) === 1) {
    if (xa(l)) return 1;
    if (xa(i)) return -1;
  }
  return i.length - l.length;
}
function xa(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Fd = {
  strict: !1,
  end: !0,
  sensitive: !1
};
function Ud(e, t, s) {
  const l = Dd(Md(e.path), s), i = Te(l, {
    record: e,
    parent: t,
    children: [],
    alias: []
  });
  return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i;
}
function Vd(e, t) {
  const s = [], l = /* @__PURE__ */ new Map();
  t = ba(Fd, t);
  function i(p) {
    return l.get(p);
  }
  function r(p, h, _) {
    const $ = !_, x = Ea(p);
    x.aliasOf = _ && _.record;
    const j = ba(t, p), V = [x];
    if ("alias" in p) {
      const N = typeof p.alias == "string" ? [p.alias] : p.alias;
      for (const Z of N) V.push(Ea(Te({}, x, {
        components: _ ? _.record.components : x.components,
        path: Z,
        aliasOf: _ ? _.record : x
      })));
    }
    let F, W;
    for (const N of V) {
      const { path: Z } = N;
      if (h && Z[0] !== "/") {
        const L = h.record.path, T = L[L.length - 1] === "/" ? "" : "/";
        N.path = h.record.path + (Z && T + Z);
      }
      if (F = Ud(N, h, j), _ ? _.alias.push(F) : (W = W || F, W !== F && W.alias.push(F), $ && p.name && !Ta(F) && c(p.name)), mo(F) && d(F), x.children) {
        const L = x.children;
        for (let T = 0; T < L.length; T++) r(L[T], F, _ && _.children[T]);
      }
      _ = _ || F;
    }
    return W ? () => {
      c(W);
    } : Ts;
  }
  function c(p) {
    if (po(p)) {
      const h = l.get(p);
      h && (l.delete(p), s.splice(s.indexOf(h), 1), h.children.forEach(c), h.alias.forEach(c));
    } else {
      const h = s.indexOf(p);
      h > -1 && (s.splice(h, 1), p.record.name && l.delete(p.record.name), p.children.forEach(c), p.alias.forEach(c));
    }
  }
  function u() {
    return s;
  }
  function d(p) {
    const h = Hd(p, s);
    s.splice(h, 0, p), p.record.name && !Ta(p) && l.set(p.record.name, p);
  }
  function g(p, h) {
    let _, $ = {}, x, j;
    if ("name" in p && p.name) {
      if (_ = l.get(p.name), !_) throw hs(Ue.MATCHER_NOT_FOUND, { location: p });
      j = _.record.name, $ = Te(Ra(h.params, _.keys.filter((W) => !W.optional).concat(_.parent ? _.parent.keys.filter((W) => W.optional) : []).map((W) => W.name)), p.params && Ra(p.params, _.keys.map((W) => W.name))), x = _.stringify($);
    } else if (p.path != null)
      x = p.path, _ = s.find((W) => W.re.test(x)), _ && ($ = _.parse(x), j = _.record.name);
    else {
      if (_ = h.name ? l.get(h.name) : s.find((W) => W.re.test(h.path)), !_) throw hs(Ue.MATCHER_NOT_FOUND, {
        location: p,
        currentLocation: h
      });
      j = _.record.name, $ = Te({}, h.params, p.params), x = _.stringify($);
    }
    const V = [];
    let F = _;
    for (; F; )
      V.unshift(F.record), F = F.parent;
    return {
      name: j,
      path: x,
      params: $,
      matched: V,
      meta: Bd(V)
    };
  }
  e.forEach((p) => r(p));
  function f() {
    s.length = 0, l.clear();
  }
  return {
    addRoute: r,
    resolve: g,
    removeRoute: c,
    clearRoutes: f,
    getRoutes: u,
    getRecordMatcher: i
  };
}
function Ra(e, t) {
  const s = {};
  for (const l of t) l in e && (s[l] = e[l]);
  return s;
}
function Ea(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: Gd(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function Gd(e) {
  const t = {}, s = e.props || !1;
  if ("component" in e) t.default = s;
  else for (const l in e.components) t[l] = typeof s == "object" ? s[l] : s;
  return t;
}
function Ta(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Bd(e) {
  return e.reduce((t, s) => Te(t, s.meta), {});
}
function Hd(e, t) {
  let s = 0, l = t.length;
  for (; s !== l; ) {
    const r = s + l >> 1;
    _o(e, t[r]) < 0 ? l = r : s = r + 1;
  }
  const i = jd(e);
  return i && (l = t.lastIndexOf(i, l - 1)), l;
}
function jd(e) {
  let t = e;
  for (; t = t.parent; ) if (mo(t) && _o(e, t) === 0) return t;
}
function mo({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function Aa(e) {
  const t = ut(kn), s = ut(xl), l = z(() => {
    const d = a(e.to);
    return t.resolve(d);
  }), i = z(() => {
    const { matched: d } = l.value, { length: g } = d, f = d[g - 1], p = s.matched;
    if (!f || !p.length) return -1;
    const h = p.findIndex(ps.bind(null, f));
    if (h > -1) return h;
    const _ = Pa(d[g - 2]);
    return g > 1 && Pa(f) === _ && p[p.length - 1].path !== _ ? p.findIndex(ps.bind(null, d[g - 2])) : h;
  }), r = z(() => i.value > -1 && qd(s.params, l.value.params)), c = z(() => i.value > -1 && i.value === s.matched.length - 1 && fo(s.params, l.value.params));
  function u(d = {}) {
    if (zd(d)) {
      const g = t[a(e.replace) ? "replace" : "push"](a(e.to)).catch(Ts);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => g), g;
    }
    return Promise.resolve();
  }
  return {
    route: l,
    href: z(() => l.value.href),
    isActive: r,
    isExactActive: c,
    navigate: u
  };
}
function Wd(e) {
  return e.length === 1 ? e[0] : e;
}
const Kd = /* @__PURE__ */ Le({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink: Aa,
  setup(e, { slots: t }) {
    const s = /* @__PURE__ */ Ft(Aa(e)), { options: l } = ut(kn), i = z(() => ({
      [Oa(e.activeClass, l.linkActiveClass, "router-link-active")]: s.isActive,
      [Oa(e.exactActiveClass, l.linkExactActiveClass, "router-link-exact-active")]: s.isExactActive
    }));
    return () => {
      const r = t.default && Wd(t.default(s));
      return e.custom ? r : qi("a", {
        "aria-current": s.isExactActive ? e.ariaCurrentValue : null,
        href: s.href,
        onClick: s.navigate,
        class: i.value
      }, r);
    };
  }
}), Rl = Kd;
function zd(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function qd(e, t) {
  for (const s in t) {
    const l = t[s], i = e[s];
    if (typeof l == "string") {
      if (l !== i) return !1;
    } else if (!mt(i) || i.length !== l.length || l.some((r, c) => r.valueOf() !== i[c].valueOf())) return !1;
  }
  return !0;
}
function Pa(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Oa = (e, t, s) => e ?? t ?? s, Jd = /* @__PURE__ */ Le({
  name: "RouterView",
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: s }) {
    const l = ut(sl), i = z(() => e.route || l.value), r = ut(ka, 0), c = z(() => {
      let g = a(r);
      const { matched: f } = i.value;
      let p;
      for (; (p = f[g]) && !p.components; ) g++;
      return g;
    }), u = z(() => i.value.matched[c.value]);
    zs(ka, z(() => c.value + 1)), zs(Sd, u), zs(sl, i);
    const d = /* @__PURE__ */ H();
    return Pe(() => [
      d.value,
      u.value,
      e.name
    ], ([g, f, p], [h, _, $]) => {
      f && (f.instances[p] = g, _ && _ !== f && g && g === h && (f.leaveGuards.size || (f.leaveGuards = _.leaveGuards), f.updateGuards.size || (f.updateGuards = _.updateGuards))), g && f && (!_ || !ps(f, _) || !h) && (f.enterCallbacks[p] || []).forEach((x) => x(g));
    }, { flush: "post" }), () => {
      const g = i.value, f = e.name, p = u.value, h = p && p.components[f];
      if (!h) return Ma(s.default, {
        Component: h,
        route: g
      });
      const _ = p.props[f], $ = _ ? _ === !0 ? g.params : typeof _ == "function" ? _(g) : _ : null, j = qi(h, Te({}, $, t, {
        onVnodeUnmounted: (V) => {
          V.component.isUnmounted && (p.instances[f] = null);
        },
        ref: d
      }));
      return Ma(s.default, {
        Component: j,
        route: g
      }) || j;
    };
  }
});
function Ma(e, t) {
  if (!e) return null;
  const s = e(t);
  return s.length === 1 ? s[0] : s;
}
const bo = Jd;
function Qd(e) {
  const t = Vd(e.routes, e), s = e.parseQuery || $d, l = e.stringifyQuery || $a, i = e.history, r = ys(), c = ys(), u = ys(), d = /* @__PURE__ */ Qo(Bt);
  let g = Bt;
  ls && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const f = Dn.bind(null, (O) => "" + O), p = Dn.bind(null, ad), h = Dn.bind(null, Ls);
  function _(O, ie) {
    let te, de;
    return po(O) ? (te = t.getRecordMatcher(O), de = ie) : de = O, t.addRoute(de, te);
  }
  function $(O) {
    const ie = t.getRecordMatcher(O);
    ie && t.removeRoute(ie);
  }
  function x() {
    return t.getRoutes().map((O) => O.record);
  }
  function j(O) {
    return !!t.getRecordMatcher(O);
  }
  function V(O, ie) {
    if (ie = Te({}, ie || d.value), typeof O == "string") {
      const S = Ln(s, O, ie.path), M = t.resolve({ path: S.path }, ie), U = i.createHref(S.fullPath);
      return Te(S, M, {
        params: h(M.params),
        hash: Ls(S.hash),
        redirectedFrom: void 0,
        href: U
      });
    }
    let te;
    if (O.path != null)
      te = Te({}, O, { path: Ln(s, O.path, ie.path).path });
    else {
      const S = Te({}, O.params);
      for (const M in S) S[M] == null && delete S[M];
      te = Te({}, O, { params: p(S) }), ie.params = p(ie.params);
    }
    const de = t.resolve(te, ie), ke = O.hash || "";
    de.params = f(h(de.params));
    const b = rd(l, Te({}, O, {
      hash: sd(ke),
      path: de.path
    })), w = i.createHref(b);
    return Te({
      fullPath: b,
      hash: ke,
      query: l === $a ? kd(O.query) : O.query || {}
    }, de, {
      redirectedFrom: void 0,
      href: w
    });
  }
  function F(O) {
    return typeof O == "string" ? Ln(s, O, d.value.path) : Te({}, O);
  }
  function W(O, ie) {
    if (g !== O) return hs(Ue.NAVIGATION_CANCELLED, {
      from: ie,
      to: O
    });
  }
  function N(O) {
    return T(O);
  }
  function Z(O) {
    return N(Te(F(O), { replace: !0 }));
  }
  function L(O, ie) {
    const te = O.matched[O.matched.length - 1];
    if (te && te.redirect) {
      const { redirect: de } = te;
      let ke = typeof de == "function" ? de(O, ie) : de;
      return typeof ke == "string" && (ke = ke.includes("?") || ke.includes("#") ? ke = F(ke) : { path: ke }, ke.params = {}), Te({
        query: O.query,
        hash: O.hash,
        params: ke.path != null ? {} : O.params
      }, ke);
    }
  }
  function T(O, ie) {
    const te = g = V(O), de = d.value, ke = O.state, b = O.force, w = O.replace === !0, S = L(te, de);
    if (S) return T(Te(F(S), {
      state: typeof S == "object" ? Te({}, ke, S.state) : ke,
      force: b,
      replace: w
    }), ie || te);
    const M = te;
    M.redirectedFrom = ie;
    let U;
    return !b && cd(l, de, te) && (U = hs(Ue.NAVIGATION_DUPLICATED, {
      to: M,
      from: de
    }), K(de, de, !0, !1)), (U ? Promise.resolve(U) : A(M, de)).catch((I) => At(I) ? At(I, Ue.NAVIGATION_GUARD_REDIRECT) ? I : fe(I) : P(I, M, de)).then((I) => {
      if (I) {
        if (At(I, Ue.NAVIGATION_GUARD_REDIRECT))
          return T(Te({ replace: w }, F(I.to), {
            state: typeof I.to == "object" ? Te({}, ke, I.to.state) : ke,
            force: b
          }), ie || M);
      } else I = re(M, de, !0, w, ke);
      return ce(M, de, I), I;
    });
  }
  function y(O, ie) {
    const te = W(O, ie);
    return te ? Promise.reject(te) : Promise.resolve();
  }
  function C(O) {
    const ie = Se.values().next().value;
    return ie && typeof ie.runWithContext == "function" ? ie.runWithContext(O) : O();
  }
  function A(O, ie) {
    let te;
    const [de, ke, b] = Cd(O, ie);
    te = Un(de.reverse(), "beforeRouteLeave", O, ie);
    for (const S of de) S.leaveGuards.forEach((M) => {
      te.push(Wt(M, O, ie));
    });
    const w = y.bind(null, O, ie);
    return te.push(w), We(te).then(() => {
      te = [];
      for (const S of r.list()) te.push(Wt(S, O, ie));
      return te.push(w), We(te);
    }).then(() => {
      te = Un(ke, "beforeRouteUpdate", O, ie);
      for (const S of ke) S.updateGuards.forEach((M) => {
        te.push(Wt(M, O, ie));
      });
      return te.push(w), We(te);
    }).then(() => {
      te = [];
      for (const S of b) if (S.beforeEnter) if (mt(S.beforeEnter)) for (const M of S.beforeEnter) te.push(Wt(M, O, ie));
      else te.push(Wt(S.beforeEnter, O, ie));
      return te.push(w), We(te);
    }).then(() => (O.matched.forEach((S) => S.enterCallbacks = {}), te = Un(b, "beforeRouteEnter", O, ie, C), te.push(w), We(te))).then(() => {
      te = [];
      for (const S of c.list()) te.push(Wt(S, O, ie));
      return te.push(w), We(te);
    }).catch((S) => At(S, Ue.NAVIGATION_CANCELLED) ? S : Promise.reject(S));
  }
  function ce(O, ie, te) {
    u.list().forEach((de) => C(() => de(O, ie, te)));
  }
  function re(O, ie, te, de, ke) {
    const b = W(O, ie);
    if (b) return b;
    const w = ie === Bt, S = ls ? history.state : {};
    te && (de || w ? i.replace(O.fullPath, Te({ scroll: w && S && S.scroll }, ke)) : i.push(O.fullPath, ke)), d.value = O, K(O, ie, te, w), fe();
  }
  let pe;
  function Re() {
    pe || (pe = i.listen((O, ie, te) => {
      if (!Ge.listening) return;
      const de = V(O), ke = L(de, Ge.currentRoute.value);
      if (ke) {
        T(Te(ke, {
          replace: !0,
          force: !0
        }), de).catch(Ts);
        return;
      }
      g = de;
      const b = d.value;
      ls && md(wa(b.fullPath, te.delta), $n()), A(de, b).catch((w) => At(w, Ue.NAVIGATION_ABORTED | Ue.NAVIGATION_CANCELLED) ? w : At(w, Ue.NAVIGATION_GUARD_REDIRECT) ? (T(Te(F(w.to), { force: !0 }), de).then((S) => {
        At(S, Ue.NAVIGATION_ABORTED | Ue.NAVIGATION_DUPLICATED) && !te.delta && te.type === el.pop && i.go(-1, !1);
      }).catch(Ts), Promise.reject()) : (te.delta && i.go(-te.delta, !1), P(w, de, b))).then((w) => {
        w = w || re(de, b, !1), w && (te.delta && !At(w, Ue.NAVIGATION_CANCELLED) ? i.go(-te.delta, !1) : te.type === el.pop && At(w, Ue.NAVIGATION_ABORTED | Ue.NAVIGATION_DUPLICATED) && i.go(-1, !1)), ce(de, b, w);
      }).catch(Ts);
    }));
  }
  let Ee = ys(), G = ys(), k;
  function P(O, ie, te) {
    fe(O);
    const de = G.list();
    return de.length ? de.forEach((ke) => ke(O, ie, te)) : console.error(O), Promise.reject(O);
  }
  function be() {
    return k && d.value !== Bt ? Promise.resolve() : new Promise((O, ie) => {
      Ee.add([O, ie]);
    });
  }
  function fe(O) {
    return k || (k = !O, Re(), Ee.list().forEach(([ie, te]) => O ? te(O) : ie()), Ee.reset()), O;
  }
  function K(O, ie, te, de) {
    const { scrollBehavior: ke } = e;
    if (!ls || !ke) return Promise.resolve();
    const b = !te && bd(wa(O.fullPath, 0)) || (de || !te) && history.state && history.state.scroll || null;
    return hn().then(() => ke(O, ie, b)).then((w) => w && _d(w)).catch((w) => P(w, O, ie));
  }
  const q = (O) => i.go(O);
  let ae;
  const Se = /* @__PURE__ */ new Set(), Ge = {
    currentRoute: d,
    listening: !0,
    addRoute: _,
    removeRoute: $,
    clearRoutes: t.clearRoutes,
    hasRoute: j,
    getRoutes: x,
    resolve: V,
    options: e,
    push: N,
    replace: Z,
    go: q,
    back: () => q(-1),
    forward: () => q(1),
    beforeEach: r.add,
    beforeResolve: c.add,
    afterEach: u.add,
    onError: G.add,
    isReady: be,
    install(O) {
      O.component("RouterLink", Rl), O.component("RouterView", bo), O.config.globalProperties.$router = Ge, Object.defineProperty(O.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => a(d)
      }), ls && !ae && d.value === Bt && (ae = !0, N(i.location).catch((de) => {
      }));
      const ie = {};
      for (const de in Bt) Object.defineProperty(ie, de, {
        get: () => d.value[de],
        enumerable: !0
      });
      O.provide(kn, Ge), O.provide(xl, /* @__PURE__ */ ui(ie)), O.provide(sl, d);
      const te = O.unmount;
      Se.add(O), O.unmount = function() {
        Se.delete(O), Se.size < 1 && (g = Bt, pe && pe(), pe = null, d.value = Bt, ae = !1, k = !1), te();
      };
    }
  };
  function We(O) {
    return O.reduce((ie, te) => ie.then(() => C(te)), Promise.resolve());
  }
  return Ge;
}
function El() {
  return ut(kn);
}
function Yd(e) {
  return ut(xl);
}
const Zd = { class: "guard-shell" }, Xd = { class: "guard-shell__topbar" }, ef = { class: "topbar-actions" }, tf = { class: "toolbar-menu" }, sf = ["title"], nf = { class: "toolbar-popover" }, lf = ["onClick"], af = { class: "toolbar-menu" }, of = ["title"], rf = { class: "toolbar-popover" }, cf = {
  key: 0,
  class: "toolbar-menu"
}, uf = ["title"], df = { class: "toolbar-popover" }, ff = {
  class: "toolbar-link",
  href: "/legacy",
  target: "_blank",
  rel: "noreferrer"
}, pf = { class: "guard-shell__body" }, hf = { class: "guard-shell__sidebar" }, gf = { class: "sidebar-current" }, _f = { class: "sidebar-current__label" }, mf = { class: "sidebar-current__title" }, bf = { class: "sidebar-current__meta" }, vf = { class: "sidebar-nav" }, yf = { class: "sidebar-group__title" }, wf = { class: "guard-shell__content" }, $f = "/ui/logo.png", kf = /* @__PURE__ */ Le({
  __name: "GuardShell",
  setup(e) {
    const t = je(), s = wn(), l = it(), i = Yd(), r = El(), c = [
      {
        id: "core",
        zh: "核心控制台",
        en: "Core Control",
        items: [
          { to: "/", zh: "首页", en: "Home" },
          { to: "/operations", zh: "运维", en: "Operations" },
          { to: "/openclaw", zh: "OpenClaw", en: "OpenClaw" },
          { to: "/channels", zh: "渠道", en: "Channels" },
          { to: "/models", zh: "模型", en: "Models" },
          { to: "/security", zh: "安全", en: "Security" },
          { to: "/recovery", zh: "备份与恢复", en: "Backup & Recovery" }
        ]
      },
      {
        id: "workspace",
        zh: "工作区与角色",
        en: "Workspace & Roles",
        items: [
          { to: "/roles", zh: "角色", en: "Roles" },
          { to: "/files", zh: "文件", en: "Files" },
          { to: "/search", zh: "搜索", en: "Search" }
        ]
      },
      {
        id: "runtime",
        zh: "运行与排查",
        en: "Runtime & Troubleshooting",
        items: [
          { to: "/sessions", zh: "会话", en: "Sessions" },
          { to: "/logs", zh: "日志", en: "Logs" },
          { to: "/notifications", zh: "通知", en: "Notifications" }
        ]
      },
      {
        id: "automation",
        zh: "自动化",
        en: "Automation",
        items: [
          { to: "/cron", zh: "Cron", en: "Cron" }
        ]
      }
    ], u = {
      "/settings": { zh: "设置", en: "Settings" }
    }, d = [
      { value: "auto", icon: "⌘", zh: "跟随系统", en: "Auto" },
      { value: "light", icon: "☀", zh: "浅色", en: "Light" },
      { value: "dark", icon: "☾", zh: "深色", en: "Dark" }
    ], g = z(() => t.themePreference === "light" ? "☀" : t.themePreference === "dark" ? "☾" : "⌘"), f = z(() => {
      const _ = c.flatMap((x) => x.items).find((x) => x.to === i.path);
      if (_)
        return t.label(_.zh, _.en);
      const $ = u[i.path];
      return $ ? t.label($.zh, $.en) : t.label("首页", "Home");
    });
    ze(() => {
      t.hydrate();
    }), Pe(() => t.themePreference, () => t.applyDocumentState()), Pe(() => t.language, () => t.applyDocumentState()), Pe(() => t.developerMode, () => t.applyDocumentState());
    function p() {
      r.push("/settings");
    }
    async function h() {
      await l.confirm({
        title: t.label("退出当前登录？", "Sign out of the current session?"),
        message: t.label("退出后需要重新输入本机访问密码。", "You will need the local access password to sign in again."),
        confirmLabel: t.label("退出登录", "Sign out"),
        cancelLabel: t.label("取消", "Cancel")
      }) && (await s.logout(), l.pushToast({
        tone: "success",
        title: t.label("已退出登录", "Signed out"),
        message: t.label("你已经退出新的模块化控制台。", "You have signed out of the modular console.")
      }));
    }
    return (_, $) => (m(), v("div", Zd, [
      n("header", Xd, [
        n("div", { class: "brand-lockup" }, [
          n("img", {
            class: "brand-lockup__logo",
            src: $f,
            alt: "OpenClaw Guard"
          }),
          $[3] || ($[3] = n("div", null, [
            n("p", { class: "brand-lockup__eyebrow" }, "OpenClaw Guard Next"),
            n("h1", { class: "brand-lockup__title" }, "OpenClaw Guard")
          ], -1))
        ]),
        n("div", ef, [
          n("div", tf, [
            n("button", {
              class: "toolbar-icon",
              type: "button",
              title: a(t).label("主题", "Theme")
            }, o(g.value), 9, sf),
            n("div", nf, [
              (m(), v(Y, null, we(d, (x) => n("button", {
                key: x.value,
                class: "toolbar-popover__item",
                type: "button",
                onClick: (j) => a(t).setThemePreference(x.value)
              }, [
                n("span", null, o(x.icon), 1),
                n("span", null, o(a(t).label(x.zh, x.en)), 1)
              ], 8, lf)), 64))
            ])
          ]),
          n("div", af, [
            n("button", {
              class: "toolbar-icon",
              type: "button",
              title: a(t).label("语言", "Language")
            }, " 🌐 ", 8, of),
            n("div", rf, [
              n("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: $[0] || ($[0] = (x) => a(t).setLanguage("zh"))
              }, [...$[4] || ($[4] = [
                n("span", null, "中", -1),
                n("span", null, "中文", -1)
              ])]),
              n("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: $[1] || ($[1] = (x) => a(t).setLanguage("en"))
              }, [...$[5] || ($[5] = [
                n("span", null, "EN", -1),
                n("span", null, "English", -1)
              ])])
            ])
          ]),
          a(s).authEnabled && a(s).authenticated ? (m(), v("div", cf, [
            n("button", {
              class: "toolbar-icon",
              type: "button",
              title: a(t).label("账号", "Account")
            }, " ⚙ ", 8, uf),
            n("div", df, [
              n("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: p
              }, [
                $[6] || ($[6] = n("span", null, "⟡", -1)),
                n("span", null, o(a(t).label("设置", "Settings")), 1)
              ]),
              n("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: $[2] || ($[2] = (x) => a(s).openChangePassword())
              }, [
                $[7] || ($[7] = n("span", null, "🔑", -1)),
                n("span", null, o(a(t).label("修改密码", "Change password")), 1)
              ]),
              n("button", {
                class: "toolbar-popover__item toolbar-popover__item--danger",
                type: "button",
                onClick: h
              }, [
                $[8] || ($[8] = n("span", null, "↩", -1)),
                n("span", null, o(a(t).label("退出登录", "Sign out")), 1)
              ])
            ])
          ])) : ue("", !0),
          n("a", ff, o(a(t).label("打开旧版控制台", "Open legacy console")), 1)
        ])
      ]),
      n("div", pf, [
        n("aside", hf, [
          n("div", gf, [
            n("p", _f, o(a(t).label("当前页面", "Current page")), 1),
            n("p", mf, o(f.value), 1),
            n("p", bf, o(a(t).label("这里是 dev-rust 分支上的模块化预览壳层。当前继续迁移真实业务页面，但不会替换正式运行时。", "This is the modular preview shell on the dev-rust line. We keep migrating real product pages here without replacing the production runtime yet.")), 1)
          ]),
          n("nav", vf, [
            (m(), v(Y, null, we(c, (x) => n("section", {
              key: x.id,
              class: "sidebar-group"
            }, [
              n("p", yf, o(a(t).label(x.zh, x.en)), 1),
              (m(!0), v(Y, null, we(x.items, (j) => (m(), He(a(Rl), {
                key: j.to,
                to: j.to,
                class: _e(["sidebar-link", { "sidebar-link--active": a(i).path === j.to }])
              }, {
                default: le(() => [
                  wl(o(a(t).label(j.zh, j.en)), 1)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128))
            ])), 64))
          ])
        ]),
        n("main", wf, [
          X(a(bo))
        ])
      ])
    ]));
  }
}), Sf = {
  key: 0,
  class: "shell-loading"
}, Cf = /* @__PURE__ */ Le({
  __name: "App",
  setup(e) {
    const t = wn(), s = it(), l = je();
    let i = () => {
    };
    return ze(() => {
      t.hydrate(), i = eu(() => {
        t.handleUnauthorized(), s.pushToast({
          tone: "warning",
          title: l.label("登录已失效", "Session expired"),
          message: l.label("请重新登录后继续使用新的模块化控制台。", "Sign in again to keep using the modular console.")
        });
      });
    }), ki(() => {
      i();
    }), (r, c) => (m(), v(Y, null, [
      a(t).ready ? a(t).requiresLogin ? (m(), He(Nu, { key: 1 })) : (m(), He(kf, { key: 2 })) : (m(), v("div", Sf, [...c[0] || (c[0] = [
        n("div", { class: "page-empty shell-loading__card" }, " Loading Guard Next… ", -1)
      ])])),
      X(Wu),
      X(Vu),
      X(wu)
    ], 64));
  }
});
function at(e, t = null, s = {}) {
  const l = /* @__PURE__ */ H(t), i = s.immediate !== !1, r = /* @__PURE__ */ H(i && t === null), c = /* @__PURE__ */ H(!1), u = /* @__PURE__ */ H(null);
  async function d(g = {}) {
    g.silent === !0 ? c.value = !0 : r.value = !0, u.value = null;
    try {
      l.value = await e();
    } catch (p) {
      u.value = p instanceof Error ? p.message : String(p);
    } finally {
      r.value = !1, c.value = !1;
    }
  }
  return ze(() => {
    i && d();
  }), _l({
    data: l,
    loading: r,
    refreshing: c,
    error: u,
    execute: d
  });
}
function st(e) {
  if (!e) return "-";
  const t = Date.parse(e);
  return Number.isFinite(t) ? new Intl.DateTimeFormat(void 0, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(t)) : e;
}
function ge(e) {
  return e == null || !Number.isFinite(e) ? "-" : new Intl.NumberFormat(void 0).format(e);
}
function xf(e) {
  return e == null || !Number.isFinite(e) ? "-" : `${e.toFixed(e >= 10 ? 0 : 1)}%`;
}
function Rf(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "-";
  if (e < 1024) return `${ge(e)} B`;
  const t = ["KB", "MB", "GB", "TB"];
  let s = e / 1024, l = 0;
  for (; s >= 1024 && l < t.length - 1; )
    s /= 1024, l += 1;
  return `${s.toFixed(s >= 10 ? 1 : 2)} ${t[l]}`;
}
function Ia(e, t = "USD") {
  if (e == null || !Number.isFinite(e)) return "-";
  if (/^[A-Z]{3}$/.test(t)) {
    const l = e >= 1 ? 2 : 4;
    return new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: t,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    }).format(e);
  }
  const s = e >= 1 ? 2 : 4;
  return `${e.toFixed(s)} ${t}`.trim();
}
function Na(e) {
  return e ? e.slice(0, 7) : "-";
}
function Ws(e) {
  const t = {
    appId: "App ID",
    appSecret: "App Secret",
    encryptKey: "Encrypt Key",
    verificationToken: "Verification Token",
    domain: "Domain",
    connectionMode: "Connection Mode",
    webhookPath: "Webhook Path",
    webhookHost: "Webhook Host",
    webhookPort: "Webhook Port",
    dmPolicy: "DM Policy",
    groupPolicy: "Group Policy",
    requireMention: "Require Mention",
    streaming: "Streaming Reply",
    renderMode: "Render Mode",
    whisperModel: "Whisper Model",
    botToken: "Bot Token",
    appToken: "App Token",
    baseUrl: "Base URL",
    apiType: "API Type",
    apiKey: "API Key",
    modelId: "Model ID"
  };
  return t[e] ? t[e] : e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/\b\w/g, (s) => s.toUpperCase());
}
function Ef(e) {
  return typeof e == "boolean" ? e : typeof e == "string" ? ["true", "1", "yes", "on"].includes(e.trim().toLowerCase()) : !1;
}
function ln(e) {
  const t = e.trim();
  if (!t) return;
  const s = Number(t);
  return Number.isFinite(s) ? s : void 0;
}
function Da(e) {
  return /token|secret|key|password/i.test(e);
}
const Tf = { class: "page-card" }, Af = { class: "page-card__header" }, Pf = {
  key: 0,
  class: "page-card__eyebrow"
}, Of = { class: "page-card__title" }, Mf = { class: "page-card__body" }, oe = /* @__PURE__ */ Le({
  __name: "PageCard",
  props: {
    title: {},
    eyebrow: {}
  },
  setup(e) {
    return (t, s) => (m(), v("section", Tf, [
      n("header", Af, [
        n("div", null, [
          e.eyebrow ? (m(), v("p", Pf, o(e.eyebrow), 1)) : ue("", !0),
          n("h2", Of, o(e.title), 1)
        ]),
        Vl(t.$slots, "actions")
      ]),
      n("div", Mf, [
        Vl(t.$slots, "default")
      ])
    ]));
  }
});
async function If() {
  const [e, t, s] = await Promise.all([
    xe("/api/channels"),
    xe("/api/channels/meta"),
    xe("/api/feishu/plugin").catch(() => ({ installed: !1 }))
  ]);
  return {
    channels: e,
    definitions: t,
    feishuPlugin: s
  };
}
function Nf(e, t) {
  return De(`/api/channels/${encodeURIComponent(e)}`, t);
}
function Df(e) {
  return lo(`/api/channels/${encodeURIComponent(e)}`);
}
const Lf = { class: "page-stack" }, Ff = { class: "page-header" }, Uf = { class: "page-header__eyebrow" }, Vf = { class: "page-header__title" }, Gf = { class: "page-header__description" }, Bf = {
  key: 0,
  class: "page-empty"
}, Hf = {
  key: 1,
  class: "page-empty page-empty--error"
}, jf = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Wf = { class: "stat-grid" }, Kf = { class: "stat-card" }, zf = { class: "stat-card__label" }, qf = { class: "stat-card" }, Jf = { class: "stat-card__label" }, Qf = { class: "stat-card" }, Yf = { class: "stat-card__label" }, Zf = { class: "stat-card" }, Xf = { class: "stat-card__label" }, ep = { class: "page-two-column" }, tp = { class: "catalog-list" }, sp = ["onClick"], np = { class: "catalog-list__title" }, lp = { class: "pill-row" }, ap = { class: "page-stack" }, ip = { class: "page-inline-status" }, op = { class: "muted-copy" }, rp = { class: "settings-grid" }, cp = { key: 0 }, up = ["onUpdate:modelValue", "type"], dp = ["onUpdate:modelValue"], fp = ["value"], pp = {
  key: 3,
  class: "checkbox-row"
}, hp = ["onUpdate:modelValue"], gp = { class: "page-actions" }, _p = ["disabled"], mp = ["disabled"], bp = { class: "list-stack" }, vp = { class: "action-row" }, yp = { class: "action-row" }, wp = { class: "action-row" }, $p = {
  key: 0,
  class: "code-panel"
}, kp = {
  key: 1,
  class: "muted-copy"
}, Sp = /* @__PURE__ */ Le({
  __name: "ChannelsPage",
  setup(e) {
    const t = {
      connectionMode: ["websocket", "webhook"],
      dmPolicy: ["open", "allowlist", "closed"],
      groupPolicy: ["open", "allowlist", "closed"],
      renderMode: ["auto", "rich", "compact"]
    };
    let s = null;
    const l = je(), i = it(), r = at(() => If(), s, { immediate: !1 }), c = /* @__PURE__ */ H(""), u = /* @__PURE__ */ H(!1), d = /* @__PURE__ */ H(!1), g = /* @__PURE__ */ Ft({}), f = /* @__PURE__ */ Ft({}), p = z(() => {
      var y;
      return new Map((((y = r.data) == null ? void 0 : y.channels) || []).map((C) => [C.id, C]));
    }), h = z(() => {
      var y;
      return new Map((((y = r.data) == null ? void 0 : y.definitions) || []).map((C) => [C.id, C]));
    }), _ = z(() => {
      var y, C;
      return h.value.get(c.value) || ((C = (y = r.data) == null ? void 0 : y.definitions) == null ? void 0 : C[0]) || null;
    }), $ = z(() => {
      const y = _.value;
      return y ? p.value.get(y.id) || {
        id: y.id,
        name: y.name,
        icon: y.icon,
        enabled: !1,
        configured: !1,
        config: {}
      } : null;
    }), x = z(() => {
      var y;
      return (((y = r.data) == null ? void 0 : y.channels) || []).filter((C) => C.enabled).length;
    }), j = z(() => {
      var y;
      return (((y = r.data) == null ? void 0 : y.channels) || []).filter((C) => C.configured).length;
    }), V = z(() => {
      const y = _.value, C = [
        {
          key: "enabled",
          label: l.label("启用这个渠道", "Enable this channel"),
          kind: "boolean",
          help: l.label("关闭后保留配置，但运行态不会接收这个入口的消息。", "Keep the config but stop receiving traffic from this channel.")
        }
      ];
      for (const A of (y == null ? void 0 : y.fields) || []) {
        if (A === "requireMention" || A === "streaming") {
          C.push({
            key: A,
            label: Ws(A),
            kind: "boolean",
            help: l.label("勾选即启用。", "Checked means enabled.")
          });
          continue;
        }
        if (t[A]) {
          C.push({
            key: A,
            label: Ws(A),
            kind: "text",
            inputType: "select",
            options: t[A].map((ce) => ({ value: ce, label: ce }))
          });
          continue;
        }
        C.push({
          key: A,
          label: Ws(A),
          kind: "text",
          inputType: /port/i.test(A) ? "number" : Da(A) ? "password" : "text"
        });
      }
      for (const A of (y == null ? void 0 : y.envFields) || [])
        C.push({
          key: `env:${A}`,
          label: `${Ws(A)} (${A})`,
          kind: "text",
          inputType: "password",
          env: !0,
          help: l.label("留空会清除这个本机环境变量。", "Leave blank to clear this local environment variable.")
        });
      return C;
    });
    function F() {
      for (const y of Object.keys(g)) delete g[y];
      for (const y of Object.keys(f)) delete f[y];
    }
    function W() {
      var A, ce;
      F();
      const y = $.value, C = _.value;
      if (!(!y || !C)) {
        f.enabled = y.enabled === !0;
        for (const re of C.fields) {
          const pe = (A = y.config) == null ? void 0 : A[re];
          re === "requireMention" || re === "streaming" ? f[re] = Ef(pe) : g[re] = pe == null ? "" : String(pe);
        }
        for (const re of C.envFields) {
          const pe = `env:${re}`;
          g[pe] = ((ce = y.config) == null ? void 0 : ce[pe]) == null ? "" : String(y.config[pe]);
        }
      }
    }
    Pe(
      () => r.data,
      (y) => {
        y && (s = y);
        const C = (y == null ? void 0 : y.definitions) || [];
        if (C.length) {
          if (!c.value || !h.value.has(c.value)) {
            c.value = C[0].id;
            return;
          }
          W();
        }
      },
      { immediate: !0 }
    ), Pe(c, () => {
      W();
    }), ze(() => {
      r.execute({ silent: !!r.data });
    });
    function N() {
      const y = $.value;
      return y ? y.id === "feishu" ? y.enabled ? l.label(
        "飞书在开源版里作为官方渠道维护。保存后会直接更新当前机器上的接入配置和回复策略。",
        "Feishu is maintained here as an official channel. Saving updates the live connection settings on this machine."
      ) : l.label(
        "飞书当前处于停用状态。先补齐机器人凭据和接入方式，再决定是否启用会更稳妥。",
        "Feishu is currently disabled. Complete the bot credentials and connection mode first, then decide whether to enable it."
      ) : y.enabled ? l.label("保存后会直接更新当前消息入口配置。", "Saving here updates the live channel configuration immediately.") : l.label("这个消息入口当前停用中。可以先补齐配置，再决定是否启用。", "This channel is currently disabled. Finish the settings first, then decide whether to enable it.") : "";
    }
    async function Z() {
      const y = $.value, C = _.value;
      if (!(!y || !C)) {
        u.value = !0;
        try {
          const A = {
            enabled: f.enabled === !0
          };
          for (const re of C.fields) {
            if (re === "requireMention" || re === "streaming") {
              A[re] = f[re] === !0;
              continue;
            }
            const pe = g[re] ?? "";
            /port/i.test(re) ? A[re] = ln(pe) ?? "" : A[re] = pe;
          }
          for (const re of C.envFields)
            A[`env:${re}`] = g[`env:${re}`] ?? "";
          const ce = await Nf(y.id, A);
          i.pushToast({
            tone: ce.success ? "success" : "error",
            message: ce.message
          }), await r.execute({ silent: !0 });
        } catch (A) {
          i.pushToast({
            tone: "error",
            message: A instanceof Error ? A.message : String(A)
          });
        } finally {
          u.value = !1;
        }
      }
    }
    async function L() {
      const y = $.value;
      if (!(!y || !await i.confirm({
        title: l.label("清空渠道配置", "Clear channel configuration"),
        message: l.label(
          `确认清空 ${y.name || y.id} 的配置吗？这会移除本机保存的字段和值。`,
          `Clear the configuration for ${y.name || y.id}? This removes the saved local values for this channel.`
        ),
        confirmLabel: l.label("确认清空", "Clear configuration"),
        cancelLabel: l.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        d.value = !0;
        try {
          const A = await Df(y.id);
          i.pushToast({
            tone: A.success ? "success" : "error",
            message: A.message
          }), await r.execute({ silent: !0 });
        } catch (A) {
          i.pushToast({
            tone: "error",
            message: A instanceof Error ? A.message : String(A)
          });
        } finally {
          d.value = !1;
        }
      }
    }
    function T(y) {
      return g[y] ?? "";
    }
    return (y, C) => (m(), v("div", Lf, [
      n("header", Ff, [
        n("div", null, [
          n("p", Uf, o(a(l).label("渠道 / Second slice", "Channels / Second slice")), 1),
          n("h2", Vf, o(a(l).label("渠道管理", "Channel management")), 1),
          n("p", Gf, o(a(l).label("先把官方渠道和内置入口迁入模块化外壳，保持真实配置读写，后续再承接插件扩展。", "Move official channels and built-in entry points into the modular shell with real read-write behavior, then extend from here later.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: C[0] || (C[0] = (A) => a(r).execute({ silent: !0 }))
        }, o(a(r).refreshing ? a(l).label("刷新中…", "Refreshing…") : a(l).label("刷新", "Refresh")), 1)
      ]),
      a(r).loading && !a(r).data ? (m(), v("div", Bf, o(a(l).label("正在读取渠道配置…", "Loading channel configuration…")), 1)) : a(r).error && !a(r).data ? (m(), v("div", Hf, o(a(r).error), 1)) : a(r).data && $.value ? (m(), v(Y, { key: 2 }, [
        a(r).error ? (m(), v("div", jf, o(a(l).label("已保留上一版渠道快照，但后台刷新失败：", "The last channel snapshot is still on screen, but the background refresh failed: ")) + o(a(r).error), 1)) : ue("", !0),
        X(oe, {
          title: a(l).label("当前概览", "Current overview"),
          eyebrow: "Summary"
        }, {
          default: le(() => [
            n("div", Wf, [
              n("article", Kf, [
                n("p", zf, o(a(l).label("可管理渠道", "Channels")), 1),
                n("strong", null, o(a(r).data.definitions.length), 1),
                n("span", null, o(a(l).label("当前内置和官方入口总数", "Built-in and official entry points available now")), 1)
              ]),
              n("article", qf, [
                n("p", Jf, o(a(l).label("已启用", "Enabled")), 1),
                n("strong", null, o(x.value), 1),
                n("span", null, o(a(l).label("运行态会接收消息", "Receives traffic at runtime")), 1)
              ]),
              n("article", Qf, [
                n("p", Yf, o(a(l).label("已配置", "Configured")), 1),
                n("strong", null, o(j.value), 1),
                n("span", null, o(a(l).label("已经填写了字段或本机变量", "Fields or local values already exist")), 1)
              ]),
              n("article", Zf, [
                n("p", Xf, o(a(l).label("飞书插件", "Feishu plugin")), 1),
                n("strong", null, o(a(r).data.feishuPlugin.installed ? a(l).label("已识别", "Detected") : a(l).label("未识别", "Not detected")), 1),
                n("span", null, o(a(r).data.feishuPlugin.version || a(l).label("官方渠道仍可直接维护", "Official channel still remains manageable")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        n("div", ep, [
          X(oe, {
            title: a(l).label("渠道目录", "Channel catalog"),
            eyebrow: "Catalog"
          }, {
            default: le(() => [
              n("div", tp, [
                (m(!0), v(Y, null, we(a(r).data.definitions, (A) => {
                  var ce, re, pe, Re;
                  return m(), v("button", {
                    key: A.id,
                    class: _e(["catalog-list__item", { "catalog-list__item--active": c.value === A.id }]),
                    type: "button",
                    onClick: (Ee) => c.value = A.id
                  }, [
                    n("div", np, [
                      n("strong", null, o(`${A.icon} ${A.name}`), 1)
                    ]),
                    n("div", lp, [
                      n("span", {
                        class: _e(["pill", (ce = p.value.get(A.id)) != null && ce.enabled ? "pill--success" : "pill--warning"])
                      }, o((re = p.value.get(A.id)) != null && re.enabled ? a(l).label("已启用", "Enabled") : a(l).label("停用", "Disabled")), 3),
                      n("span", {
                        class: _e(["pill", (pe = p.value.get(A.id)) != null && pe.configured ? "pill--success" : "pill--muted"])
                      }, o((Re = p.value.get(A.id)) != null && Re.configured ? a(l).label("已配置", "Configured") : a(l).label("未配置", "Empty")), 3)
                    ])
                  ], 10, sp);
                }), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          n("div", ap, [
            X(oe, {
              title: $.value.name,
              eyebrow: "Editor"
            }, {
              default: le(() => [
                n("div", ip, [
                  n("span", {
                    class: _e(["pill", $.value.enabled ? "pill--success" : "pill--warning"])
                  }, o($.value.enabled ? a(l).label("正在接收消息", "Receiving traffic") : a(l).label("当前停用", "Currently disabled")), 3),
                  n("span", {
                    class: _e(["pill", $.value.configured ? "pill--success" : "pill--muted"])
                  }, o($.value.configured ? a(l).label("配置已完成", "Configured") : a(l).label("还未配置", "Not configured")), 3)
                ]),
                n("p", op, o(N()), 1),
                n("div", rp, [
                  (m(!0), v(Y, null, we(V.value, (A) => (m(), v("label", {
                    key: A.key,
                    class: "settings-field"
                  }, [
                    n("span", null, o(A.label), 1),
                    A.help ? (m(), v("small", cp, o(A.help), 1)) : ue("", !0),
                    A.kind === "text" && A.inputType !== "select" ? $e((m(), v("input", {
                      key: 1,
                      "onUpdate:modelValue": (ce) => g[A.key] = ce,
                      class: "settings-input",
                      type: A.inputType || "text"
                    }, null, 8, up)), [
                      [Nc, g[A.key]]
                    ]) : A.kind === "text" && A.inputType === "select" ? $e((m(), v("select", {
                      key: 2,
                      "onUpdate:modelValue": (ce) => g[A.key] = ce,
                      class: "settings-input"
                    }, [
                      (m(!0), v(Y, null, we(A.options, (ce) => (m(), v("option", {
                        key: ce.value,
                        value: ce.value
                      }, o(ce.label), 9, fp))), 128))
                    ], 8, dp)), [
                      [ft, g[A.key]]
                    ]) : (m(), v("label", pp, [
                      $e(n("input", {
                        "onUpdate:modelValue": (ce) => f[A.key] = ce,
                        type: "checkbox"
                      }, null, 8, hp), [
                        [as, f[A.key]]
                      ]),
                      n("span", null, o(A.help || a(l).label("勾选即启用。", "Checked means enabled.")), 1)
                    ]))
                  ]))), 128))
                ]),
                n("div", gp, [
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: u.value,
                    onClick: Z
                  }, o(u.value ? a(l).label("保存中…", "Saving…") : a(l).label("保存渠道配置", "Save channel configuration")), 9, _p),
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: W
                  }, o(a(l).label("恢复当前值", "Reset draft")), 1),
                  n("button", {
                    class: "inline-link inline-link--danger",
                    type: "button",
                    disabled: d.value,
                    onClick: L
                  }, o(d.value ? a(l).label("清空中…", "Clearing…") : a(l).label("清空配置", "Clear configuration")), 9, mp)
                ])
              ]),
              _: 1
            }, 8, ["title"]),
            X(oe, {
              title: a(l).label("配置摘要", "Configuration summary"),
              eyebrow: "Summary"
            }, {
              default: le(() => {
                var A, ce;
                return [
                  n("div", bp, [
                    n("article", vp, [
                      n("div", null, [
                        n("h3", null, o(a(l).label("普通字段", "Regular fields")), 1),
                        n("p", null, o(a(l).label("优先看这里就能知道这个渠道是否已经具备基本接入条件。", "Start here to see whether the channel has the basic information required to connect.")), 1)
                      ]),
                      n("strong", null, o(((A = _.value) == null ? void 0 : A.fields.length) || 0), 1)
                    ]),
                    n("article", yp, [
                      n("div", null, [
                        n("h3", null, o(a(l).label("本机变量", "Local secrets")), 1),
                        n("p", null, o(a(l).label("敏感值优先以本机变量方式保存，便于后续替换或清空。", "Sensitive values are best stored as local variables so they can be rotated or cleared later.")), 1)
                      ]),
                      n("strong", null, o(((ce = _.value) == null ? void 0 : ce.envFields.length) || 0), 1)
                    ]),
                    n("article", wp, [
                      n("div", null, [
                        n("h3", null, o(a(l).label("当前草稿", "Current draft")), 1),
                        n("p", null, o(a(l).label("这里只显示你现在编辑中的内容，不会自动写入运行态。", "This only shows the values you are editing now. Nothing reaches runtime until you save.")), 1)
                      ]),
                      n("strong", null, o($.value.id), 1)
                    ])
                  ]),
                  a(l).developerMode ? (m(), v("pre", $p, o(JSON.stringify({
                    enabled: f.enabled,
                    fields: Object.fromEntries(Object.keys(g).filter((re) => !re.startsWith("env:")).map((re) => [re, a(Da)(re) && T(re) ? "******" : T(re)])),
                    envFields: Object.fromEntries(Object.keys(g).filter((re) => re.startsWith("env:")).map((re) => [re, T(re) ? "******" : ""]))
                  }, null, 2)), 1)) : (m(), v("p", kp, o(a(l).label("当前草稿的原始配置预览已收纳到开发者模式里。需要排查字段写入结果时，请先到 Settings 打开开发者模式。", "The raw draft preview now stays behind developer mode. Enable it from Settings when you need to inspect the exact payload.")), 1))
                ];
              }),
              _: 1
            }, 8, ["title"])
          ])
        ])
      ], 64)) : ue("", !0)
    ]));
  }
});
function Cp() {
  return xe("/api/cron-ui");
}
function xp(e) {
  return De("/api/cron-ui/create", e);
}
function Rp(e) {
  return De("/api/cron-ui/update", e);
}
function Ep(e) {
  return De("/api/cron-ui/enable", { jobId: e });
}
function Tp(e) {
  return De("/api/cron-ui/disable", { jobId: e });
}
function Ap(e) {
  return De("/api/cron-ui/run", { jobId: e });
}
function Pp(e) {
  return De("/api/cron-ui/remove", { jobId: e });
}
const Op = { class: "page-stack" }, Mp = { class: "page-header" }, Ip = { class: "page-header__eyebrow" }, Np = { class: "page-header__title" }, Dp = { class: "page-header__description" }, Lp = {
  key: 0,
  class: "page-empty"
}, Fp = {
  key: 1,
  class: "page-empty page-empty--error"
}, Up = { class: "stat-grid" }, Vp = { class: "stat-card" }, Gp = { class: "stat-card__label" }, Bp = { class: "stat-card" }, Hp = { class: "stat-card__label" }, jp = { class: "stat-card" }, Wp = { class: "stat-card__label" }, Kp = { class: "stat-card" }, zp = { class: "stat-card__label" }, qp = { class: "stat-card" }, Jp = { class: "stat-card__label" }, Qp = { class: "stat-card" }, Yp = { class: "stat-card__label" }, Zp = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Xp = {
  key: 0,
  class: "code-panel"
}, eh = {
  key: 1,
  class: "muted-copy"
}, th = { class: "list-stack" }, sh = {
  key: 0,
  class: "risk-row"
}, nh = { class: "page-split" }, lh = { class: "provider-card__header" }, ah = { class: "muted-copy" }, ih = { class: "settings-grid settings-grid--wide" }, oh = { class: "settings-field" }, rh = ["placeholder"], ch = { class: "settings-field" }, uh = ["placeholder"], dh = { class: "settings-field" }, fh = { class: "settings-field" }, ph = ["placeholder"], hh = { class: "settings-field" }, gh = { class: "settings-field" }, _h = { class: "settings-field" }, mh = ["placeholder"], bh = { class: "settings-field" }, vh = { value: "" }, yh = { class: "settings-field" }, wh = { class: "settings-field" }, $h = { class: "settings-field" }, kh = ["placeholder"], Sh = { class: "settings-field settings-field--full" }, Ch = ["placeholder"], xh = { class: "settings-field settings-field--full" }, Rh = ["placeholder"], Eh = { class: "checkbox-grid" }, Th = { class: "checkbox-card" }, Ah = { class: "checkbox-card__body" }, Ph = { class: "checkbox-card" }, Oh = { class: "checkbox-card__body" }, Mh = { class: "checkbox-card" }, Ih = { class: "checkbox-card__body" }, Nh = { class: "checkbox-card" }, Dh = { class: "checkbox-card__body" }, Lh = { class: "page-actions" }, Fh = ["disabled"], Uh = { class: "control-grid" }, Vh = { class: "settings-field" }, Gh = ["placeholder"], Bh = { class: "pill-row" }, Hh = {
  key: 0,
  class: "provider-stack"
}, jh = { class: "provider-card__header" }, Wh = { class: "mini-list" }, Kh = { class: "mini-list__item mini-list__item--stack" }, zh = { class: "mini-list__item mini-list__item--stack" }, qh = { class: "mini-list__item mini-list__item--stack" }, Jh = { class: "page-actions" }, Qh = ["onClick"], Yh = ["disabled", "onClick"], Zh = ["disabled", "onClick"], Xh = ["disabled", "onClick"], eg = {
  key: 1,
  class: "page-empty"
}, tg = /* @__PURE__ */ Le({
  __name: "CronPage",
  setup(e) {
    let t = null;
    const s = je(), l = it(), i = /* @__PURE__ */ H(""), r = /* @__PURE__ */ H("all"), c = /* @__PURE__ */ H("create"), u = /* @__PURE__ */ H(""), d = /* @__PURE__ */ H(""), g = /* @__PURE__ */ H(null), f = at(() => Cp(), t, { immediate: !1 }), p = /* @__PURE__ */ Ft(j());
    Pe(() => f.data, (G) => {
      G && (t = G);
    }), ze(() => {
      f.execute({ silent: !!f.data });
    });
    const h = z(() => {
      var G;
      return ((G = f.data) == null ? void 0 : G.jobs) || [];
    }), _ = z(() => h.value.filter((G) => G.enabled)), $ = z(() => h.value.filter((G) => !G.enabled)), x = z(() => {
      const G = i.value.trim().toLowerCase();
      return h.value.filter((k) => r.value === "enabled" && !k.enabled || r.value === "disabled" && k.enabled ? !1 : G ? [
        k.name,
        k.id,
        k.agentId,
        k.schedule,
        k.prompt,
        k.status
      ].join(" ").toLowerCase().includes(G) : !0);
    });
    Pe(h, () => {
      c.value === "edit" && !h.value.find((G) => G.id === u.value) && F();
    });
    function j() {
      return {
        name: "",
        description: "",
        agentId: "",
        prompt: "",
        scheduleMode: "cron",
        scheduleValue: "0 9 * * *",
        enabled: !0,
        timezone: "",
        model: "",
        thinking: "",
        session: "main",
        wake: "now",
        timeoutSeconds: "30",
        stagger: "",
        announce: !1,
        bestEffortDeliver: !1,
        deleteAfterRun: !1
      };
    }
    function V(G = j()) {
      Object.assign(p, G);
    }
    function F() {
      c.value = "create", u.value = "", V();
    }
    function W(G) {
      const k = Number(G);
      return !Number.isFinite(k) || k <= 0 ? "" : k % 864e5 === 0 ? `${k / 864e5}d` : k % 36e5 === 0 ? `${k / 36e5}h` : k % 6e4 === 0 ? `${k / 6e4}m` : k % 1e3 === 0 ? `${k / 1e3}s` : String(k);
    }
    function N(G) {
      const k = G.raw || {}, P = k.payload || {}, be = k.schedule || {}, fe = j();
      return be.kind === "every" ? (fe.scheduleMode = "every", fe.scheduleValue = W(be.everyMs)) : be.kind === "at" ? (fe.scheduleMode = "at", fe.scheduleValue = String(be.at || "")) : be.kind === "cron" && (fe.scheduleMode = "cron", fe.scheduleValue = String(be.expr || "")), !fe.scheduleValue && typeof G.schedule == "string" && (G.schedule.startsWith("cron ") ? (fe.scheduleMode = "cron", fe.scheduleValue = G.schedule.slice(5).trim()) : G.schedule.startsWith("every ") ? (fe.scheduleMode = "every", fe.scheduleValue = G.schedule.slice(6).trim()) : G.schedule.startsWith("at ") ? (fe.scheduleMode = "at", fe.scheduleValue = G.schedule.slice(3).trim()) : fe.scheduleValue = G.schedule.trim()), fe.stagger = W(be.staggerMs), fe.name = String(k.name || G.name || ""), fe.description = String(k.description || ""), fe.agentId = String(k.agentId || G.agentId || ""), fe.prompt = String(P.message || P.text || k.message || G.prompt || ""), fe.enabled = G.enabled !== !1, fe.timezone = String(k.tz || ""), fe.model = String(k.model || P.model || ""), fe.thinking = String(k.thinking || P.thinking || ""), fe.session = String(k.session || P.session || fe.session), fe.wake = String(k.wake || fe.wake), fe.timeoutSeconds = k.timeoutSeconds ? String(k.timeoutSeconds) : fe.timeoutSeconds, fe.announce = k.announce === !0 || k.deliver === !0, fe.bestEffortDeliver = k.bestEffortDeliver === !0, fe.deleteAfterRun = k.deleteAfterRun === !0, fe;
    }
    function Z(G) {
      return G === !0 ? s.label("已开启", "Enabled") : G === !1 ? s.label("已关闭", "Disabled") : s.label("未知", "Unknown");
    }
    function L(G) {
      const k = String(G.status || "").trim().toLowerCase();
      if (!k) return G.enabled ? s.label("已启用", "Enabled") : s.label("已停用", "Disabled");
      const be = {
        enabled: { zh: "已启用", en: "Enabled" },
        disabled: { zh: "已停用", en: "Disabled" },
        running: { zh: "执行中", en: "Running" },
        queued: { zh: "排队中", en: "Queued" },
        pending: { zh: "等待中", en: "Pending" },
        paused: { zh: "已暂停", en: "Paused" },
        success: { zh: "成功", en: "Success" },
        completed: { zh: "已完成", en: "Completed" },
        failed: { zh: "失败", en: "Failed" },
        error: { zh: "异常", en: "Error" }
      }[k];
      return be ? s.label(be.zh, be.en) : k;
    }
    function T(G) {
      const k = String(G.status || "").trim().toLowerCase();
      return ["running", "success", "completed", "enabled"].includes(k) ? "pill--success" : ["queued", "pending", "paused", "disabled"].includes(k) || G.enabled === !1 ? "pill--warning" : ["failed", "error"].includes(k) ? "pill--danger" : G.enabled ? "pill--info" : "pill--warning";
    }
    function y() {
      return p.scheduleMode === "every" ? "10m / 1h" : p.scheduleMode === "at" ? "2026-03-20T09:00:00+08:00" : "0 9 * * *";
    }
    function C() {
      return {
        name: p.name.trim() || void 0,
        description: p.description.trim() || void 0,
        agentId: p.agentId.trim() || void 0,
        prompt: p.prompt.trim() || void 0,
        scheduleMode: p.scheduleMode,
        scheduleValue: p.scheduleValue.trim(),
        enabled: p.enabled,
        timezone: p.timezone.trim() || void 0,
        model: p.model.trim() || void 0,
        thinking: p.thinking || void 0,
        session: p.session || void 0,
        wake: p.wake || void 0,
        timeoutSeconds: ln(p.timeoutSeconds),
        stagger: p.stagger.trim() || void 0,
        announce: p.announce,
        bestEffortDeliver: p.bestEffortDeliver,
        deleteAfterRun: p.deleteAfterRun
      };
    }
    async function A() {
      await f.execute({ silent: !!f.data });
    }
    function ce(G, k) {
      g.value = {
        tone: k,
        message: G.message,
        detail: G.output,
        at: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    async function re(G, k = !1) {
      const P = G.success ? "success" : "error";
      ce(G, P), l.pushToast({
        tone: P,
        message: G.message
      }), G.success && k && F(), await A();
    }
    async function pe() {
      const G = c.value === "edit" ? "update" : "create";
      d.value = G;
      try {
        const k = C(), P = c.value === "edit" ? await Rp({ jobId: u.value, ...k }) : await xp(k);
        await re(P, P.success);
      } catch (k) {
        const P = k instanceof Error ? k.message : String(k);
        g.value = {
          tone: "error",
          message: P,
          at: (/* @__PURE__ */ new Date()).toISOString()
        }, l.pushToast({
          tone: "error",
          message: P
        });
      } finally {
        d.value = "";
      }
    }
    function Re(G) {
      c.value = "edit", u.value = G.id, V(N(G));
    }
    async function Ee(G, k) {
      if (G === "remove" && !await l.confirm({
        title: s.label("删除 Cron 任务", "Delete cron job"),
        message: s.label(`确认删除任务 ${k.id}？`, `Delete cron job ${k.id}?`),
        confirmLabel: s.label("确认删除", "Delete job"),
        cancelLabel: s.label("取消", "Cancel"),
        tone: "danger"
      }))
        return;
      const P = `${G}:${k.id}`;
      d.value = P;
      try {
        const be = G === "run" ? await Ap(k.id) : G === "enable" ? await Ep(k.id) : G === "disable" ? await Tp(k.id) : await Pp(k.id);
        await re(be, G === "remove" && c.value === "edit" && u.value === k.id);
      } catch (be) {
        const fe = be instanceof Error ? be.message : String(be);
        g.value = {
          tone: "error",
          message: fe,
          at: (/* @__PURE__ */ new Date()).toISOString()
        }, l.pushToast({
          tone: "error",
          message: fe
        });
      } finally {
        d.value = "";
      }
    }
    return (G, k) => (m(), v("div", Op, [
      n("header", Mp, [
        n("div", null, [
          n("p", Ip, o(a(s).label("Cron / Fourth slice", "Cron / Fourth slice")), 1),
          n("h2", Np, o(a(s).label("自动化任务", "Automation jobs")), 1),
          n("p", Dp, o(a(s).label("把当前 Cron 的创建、编辑、运行、启停和删除能力迁进新壳层里，同时保持旧接口合同不变，让自动化真正进入模块化前端。", "Move cron create, edit, run, enable, disable, and remove flows into the new shell while keeping the existing backend contract unchanged, so automation is fully part of the modular frontend.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: A
        }, o(a(f).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新任务状态", "Refresh jobs")), 1)
      ]),
      a(f).loading && !a(f).data ? (m(), v("div", Lp, o(a(s).label("正在读取 Cron 状态与任务列表…", "Loading cron status and jobs…")), 1)) : a(f).error && !a(f).data ? (m(), v("div", Fp, o(a(f).error), 1)) : a(f).data ? (m(), v(Y, { key: 2 }, [
        X(oe, {
          title: a(s).label("运行概览", "Runtime overview"),
          eyebrow: "Overview"
        }, {
          default: le(() => [
            n("div", Up, [
              n("article", Vp, [
                n("p", Gp, o(a(s).label("任务总数", "Jobs")), 1),
                n("strong", null, o(a(ge)(a(f).data.jobs.length)) + " / " + o(a(ge)(a(f).data.total)), 1),
                n("span", null, o(a(s).label("当前已加载任务 / 运行态汇总总量", "Loaded jobs / runtime total")), 1)
              ]),
              n("article", Bp, [
                n("p", Hp, o(a(s).label("已启用", "Enabled")), 1),
                n("strong", null, o(a(ge)(_.value.length)), 1),
                n("span", null, o(a(s).label("这些任务会按计划自动执行", "These jobs run on their schedule")), 1)
              ]),
              n("article", jp, [
                n("p", Wp, o(a(s).label("已停用", "Disabled")), 1),
                n("strong", null, o(a(ge)($.value.length)), 1),
                n("span", null, o(a(s).label("停用后仍会保留，之后可以重新开启", "Disabled jobs stay available and can be resumed later")), 1)
              ]),
              n("article", Kp, [
                n("p", zp, o(a(s).label("调度器状态", "Scheduler")), 1),
                n("strong", null, o(Z(a(f).data.status.enabled)), 1),
                n("span", null, o(a(f).data.status.schedulerNextWakeAt ? a(st)(a(f).data.status.schedulerNextWakeAt) : a(f).data.status.storePath || a(s).label("暂未返回调度器路径", "No scheduler path reported yet")), 1)
              ]),
              n("article", qp, [
                n("p", Jp, o(a(s).label("运行态任务数", "Runtime job count")), 1),
                n("strong", null, o(a(ge)(a(f).data.status.jobsCount)), 1),
                n("span", null, o(a(s).label("来自 openclaw cron status 的运行态统计", "Reported directly by openclaw cron status")), 1)
              ]),
              n("article", Qp, [
                n("p", Yp, o(a(s).label("分页窗口", "Pagination window")), 1),
                n("strong", null, o(a(ge)(a(f).data.offset)) + " / " + o(a(ge)(a(f).data.limit)), 1),
                n("span", null, o(a(f).data.hasMore ? a(s).label(`还有更多任务未加载，nextOffset=${a(f).data.nextOffset ?? "-"}`, `More jobs remain, nextOffset=${a(f).data.nextOffset ?? "-"}`) : a(s).label("当前页已经完整", "The current page is complete")), 1)
              ])
            ]),
            a(f).error ? (m(), v("div", Zp, o(a(s).label("已保留上一版成功结果，同时后台刷新失败：", "The last successful result is still on screen, but the background refresh failed: ")) + o(a(f).error), 1)) : ue("", !0)
          ]),
          _: 1
        }, 8, ["title"]),
        g.value ? (m(), He(oe, {
          key: 0,
          title: a(s).label("最近一次任务操作", "Latest task action"),
          eyebrow: "Action"
        }, {
          default: le(() => [
            n("div", {
              class: _e(["status-banner", g.value.tone === "success" ? "status-banner--success" : "status-banner--error"])
            }, [
              n("strong", null, o(g.value.message), 1),
              n("span", null, o(a(st)(g.value.at)), 1)
            ], 2),
            a(s).developerMode && g.value.detail ? (m(), v("pre", Xp, o(g.value.detail), 1)) : g.value.detail ? (m(), v("p", eh, o(a(s).label("最近一次任务动作的原始 detail 已收纳到开发者模式里。需要查看底层返回内容时，请先到 Settings 打开开发者模式。", "The raw detail from the latest task action now stays behind developer mode. Enable it from Settings if you need the underlying payload.")), 1)) : ue("", !0)
          ]),
          _: 1
        }, 8, ["title"])) : ue("", !0),
        a(f).data.warnings.length || a(f).data.hasMore ? (m(), He(oe, {
          key: 1,
          title: a(s).label("当前提醒", "Current warnings"),
          eyebrow: "Warnings"
        }, {
          default: le(() => [
            n("div", th, [
              (m(!0), v(Y, null, we(a(f).data.warnings, (P) => (m(), v("article", {
                key: P,
                class: "risk-row"
              }, [
                n("strong", null, o(a(s).label("注意事项", "Warning")), 1),
                n("span", null, o(P), 1)
              ]))), 128)),
              a(f).data.hasMore ? (m(), v("article", sh, [
                n("strong", null, o(a(s).label("尚未完整加载", "More jobs exist")), 1),
                n("span", null, o(a(s).label(`当前只拉取到 ${a(f).data.jobs.length} 条任务，运行态汇总显示总量为 ${a(f).data.total}。`, `Only ${a(f).data.jobs.length} jobs are loaded while the runtime reports ${a(f).data.total} in total.`)), 1)
              ])) : ue("", !0)
            ])
          ]),
          _: 1
        }, 8, ["title"])) : ue("", !0),
        n("div", nh, [
          X(oe, {
            title: c.value === "edit" ? a(s).label(`编辑任务 ${u.value}`, `Edit ${u.value}`) : a(s).label("新建 Cron 任务", "Create cron job"),
            eyebrow: "Editor"
          }, {
            default: le(() => [
              n("div", lh, [
                n("p", ah, o(a(s).label("这里直接复用现有的 cron-ui 接口，所以保存后的任务会立即回到同一套运行态里，不会产生第二套自动化系统。", "This editor talks to the existing cron-ui API directly, so saved jobs go back into the same runtime immediately instead of creating a second automation system.")), 1),
                n("span", {
                  class: _e(["pill", c.value === "edit" ? "pill--warning" : "pill--success"])
                }, o(c.value === "edit" ? a(s).label("编辑模式", "Edit mode") : a(s).label("创建模式", "Create mode")), 3)
              ]),
              n("form", {
                class: "page-form-stack",
                onSubmit: _s(pe, ["prevent"])
              }, [
                n("div", ih, [
                  n("label", oh, [
                    n("span", null, o(a(s).label("任务名称", "Job name")), 1),
                    $e(n("input", {
                      "onUpdate:modelValue": k[0] || (k[0] = (P) => p.name = P),
                      class: "settings-input",
                      type: "text",
                      placeholder: a(s).label("例如：每日汇总", "Example: Daily brief")
                    }, null, 8, rh), [
                      [Ne, p.name]
                    ])
                  ]),
                  n("label", ch, [
                    n("span", null, o(a(s).label("Agent ID", "Agent ID")), 1),
                    $e(n("input", {
                      "onUpdate:modelValue": k[1] || (k[1] = (P) => p.agentId = P),
                      class: "settings-input",
                      type: "text",
                      placeholder: a(s).label("例如：task-hub", "Example: task-hub")
                    }, null, 8, uh), [
                      [Ne, p.agentId]
                    ])
                  ]),
                  n("label", dh, [
                    n("span", null, o(a(s).label("调度类型", "Schedule mode")), 1),
                    $e(n("select", {
                      "onUpdate:modelValue": k[2] || (k[2] = (P) => p.scheduleMode = P),
                      class: "settings-input"
                    }, [...k[21] || (k[21] = [
                      n("option", { value: "cron" }, "cron", -1),
                      n("option", { value: "every" }, "every", -1),
                      n("option", { value: "at" }, "at", -1)
                    ])], 512), [
                      [ft, p.scheduleMode]
                    ])
                  ]),
                  n("label", fh, [
                    n("span", null, o(a(s).label("调度值", "Schedule value")), 1),
                    $e(n("input", {
                      "onUpdate:modelValue": k[3] || (k[3] = (P) => p.scheduleValue = P),
                      class: "settings-input",
                      type: "text",
                      placeholder: y()
                    }, null, 8, ph), [
                      [Ne, p.scheduleValue]
                    ]),
                    n("small", null, o(a(s).label("cron 用 5 段表达式；every 例如 10m / 1h；at 支持 ISO 时间或 +20m。", "Use a 5-field cron expression, 10m / 1h for every, or ISO time / +20m for at.")), 1)
                  ]),
                  n("label", hh, [
                    n("span", null, o(a(s).label("时区", "Timezone")), 1),
                    $e(n("input", {
                      "onUpdate:modelValue": k[4] || (k[4] = (P) => p.timezone = P),
                      class: "settings-input",
                      type: "text",
                      placeholder: "Asia/Shanghai"
                    }, null, 512), [
                      [Ne, p.timezone]
                    ])
                  ]),
                  n("label", gh, [
                    n("span", null, o(a(s).label("会话模式", "Session mode")), 1),
                    $e(n("select", {
                      "onUpdate:modelValue": k[5] || (k[5] = (P) => p.session = P),
                      class: "settings-input"
                    }, [...k[22] || (k[22] = [
                      n("option", { value: "main" }, "main", -1),
                      n("option", { value: "isolated" }, "isolated", -1)
                    ])], 512), [
                      [ft, p.session]
                    ])
                  ]),
                  n("label", _h, [
                    n("span", null, o(a(s).label("模型覆盖", "Model override")), 1),
                    $e(n("input", {
                      "onUpdate:modelValue": k[6] || (k[6] = (P) => p.model = P),
                      class: "settings-input",
                      type: "text",
                      placeholder: a(s).label("留空则使用 Agent 默认模型", "Leave blank to use the agent default")
                    }, null, 8, mh), [
                      [Ne, p.model]
                    ])
                  ]),
                  n("label", bh, [
                    n("span", null, o(a(s).label("Thinking 等级", "Thinking level")), 1),
                    $e(n("select", {
                      "onUpdate:modelValue": k[7] || (k[7] = (P) => p.thinking = P),
                      class: "settings-input"
                    }, [
                      n("option", vh, o(a(s).label("跟随默认", "Use default")), 1),
                      k[23] || (k[23] = n("option", { value: "off" }, "off", -1)),
                      k[24] || (k[24] = n("option", { value: "minimal" }, "minimal", -1)),
                      k[25] || (k[25] = n("option", { value: "low" }, "low", -1)),
                      k[26] || (k[26] = n("option", { value: "medium" }, "medium", -1)),
                      k[27] || (k[27] = n("option", { value: "high" }, "high", -1))
                    ], 512), [
                      [ft, p.thinking]
                    ])
                  ]),
                  n("label", yh, [
                    n("span", null, o(a(s).label("唤醒时机", "Wake mode")), 1),
                    $e(n("select", {
                      "onUpdate:modelValue": k[8] || (k[8] = (P) => p.wake = P),
                      class: "settings-input"
                    }, [...k[28] || (k[28] = [
                      n("option", { value: "now" }, "now", -1),
                      n("option", { value: "next-heartbeat" }, "next-heartbeat", -1)
                    ])], 512), [
                      [ft, p.wake]
                    ])
                  ]),
                  n("label", wh, [
                    n("span", null, o(a(s).label("超时（秒）", "Timeout (seconds)")), 1),
                    $e(n("input", {
                      "onUpdate:modelValue": k[9] || (k[9] = (P) => p.timeoutSeconds = P),
                      class: "settings-input",
                      type: "number",
                      min: "1",
                      placeholder: "30"
                    }, null, 512), [
                      [Ne, p.timeoutSeconds]
                    ])
                  ]),
                  n("label", $h, [
                    n("span", null, o(a(s).label("错峰", "Stagger")), 1),
                    $e(n("input", {
                      "onUpdate:modelValue": k[10] || (k[10] = (P) => p.stagger = P),
                      class: "settings-input",
                      type: "text",
                      placeholder: a(s).label("例如：5m，填 0 表示精确执行", "Example: 5m, use 0 for exact timing")
                    }, null, 8, kh), [
                      [Ne, p.stagger]
                    ])
                  ]),
                  n("label", Sh, [
                    n("span", null, o(a(s).label("任务消息", "Prompt")), 1),
                    $e(n("textarea", {
                      "onUpdate:modelValue": k[11] || (k[11] = (P) => p.prompt = P),
                      class: "settings-textarea",
                      placeholder: a(s).label("例如：汇总今天的新线索并输出为 Markdown。", "Example: Summarize today’s new leads in Markdown.")
                    }, null, 8, Ch), [
                      [Ne, p.prompt]
                    ])
                  ]),
                  n("label", xh, [
                    n("span", null, o(a(s).label("描述", "Description")), 1),
                    $e(n("textarea", {
                      "onUpdate:modelValue": k[12] || (k[12] = (P) => p.description = P),
                      class: "settings-textarea",
                      placeholder: a(s).label("可选，用来解释这个任务的用途。", "Optional note explaining what this job is for.")
                    }, null, 8, Rh), [
                      [Ne, p.description]
                    ])
                  ])
                ]),
                n("div", Eh, [
                  n("label", Th, [
                    $e(n("input", {
                      "onUpdate:modelValue": k[13] || (k[13] = (P) => p.enabled = P),
                      type: "checkbox"
                    }, null, 512), [
                      [as, p.enabled]
                    ]),
                    n("div", Ah, [
                      n("strong", null, o(a(s).label("保存后立即启用", "Enable after save")), 1),
                      n("p", null, o(a(s).label("关闭时任务会保留，但不会按计划自动执行。", "When disabled, the job stays available but will not run automatically.")), 1)
                    ])
                  ]),
                  n("label", Ph, [
                    $e(n("input", {
                      "onUpdate:modelValue": k[14] || (k[14] = (P) => p.announce = P),
                      type: "checkbox"
                    }, null, 512), [
                      [as, p.announce]
                    ]),
                    n("div", Oh, [
                      n("strong", null, o(a(s).label("投递结果", "Deliver output")), 1),
                      n("p", null, o(a(s).label("执行完成后尝试把结果投递回会话或目标通道。", "Try to deliver the result back to the session or target channel after execution.")), 1)
                    ])
                  ]),
                  n("label", Mh, [
                    $e(n("input", {
                      "onUpdate:modelValue": k[15] || (k[15] = (P) => p.bestEffortDeliver = P),
                      type: "checkbox"
                    }, null, 512), [
                      [as, p.bestEffortDeliver]
                    ]),
                    n("div", Ih, [
                      n("strong", null, o(a(s).label("尽力投递", "Best effort deliver")), 1),
                      n("p", null, o(a(s).label("当目标暂时不可用时，尽量保留或稍后交付结果。", "Keep or retry delivery when the target is temporarily unavailable.")), 1)
                    ])
                  ]),
                  n("label", Nh, [
                    $e(n("input", {
                      "onUpdate:modelValue": k[16] || (k[16] = (P) => p.deleteAfterRun = P),
                      type: "checkbox"
                    }, null, 512), [
                      [as, p.deleteAfterRun]
                    ]),
                    n("div", Dh, [
                      n("strong", null, o(a(s).label("运行后删除", "Delete after run")), 1),
                      n("p", null, o(a(s).label("适合一次性任务；普通巡检或日报不建议开启。", "Useful for one-off jobs. Leave it off for recurring inspections or briefs.")), 1)
                    ])
                  ])
                ])
              ], 32),
              n("div", Lh, [
                n("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  disabled: d.value === "create" || d.value === "update",
                  onClick: pe
                }, o(d.value === "create" || d.value === "update" ? a(s).label("保存中…", "Saving…") : c.value === "edit" ? a(s).label("保存修改", "Save changes") : a(s).label("创建任务", "Create job")), 9, Fh),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  onClick: F
                }, o(c.value === "edit" ? a(s).label("切回创建模式", "Switch to create mode") : a(s).label("重置表单", "Reset form")), 1)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(oe, {
            title: a(s).label("任务列表", "Job list"),
            eyebrow: "Jobs"
          }, {
            default: le(() => [
              n("div", Uh, [
                n("label", Vh, [
                  n("span", null, o(a(s).label("搜索", "Search")), 1),
                  $e(n("input", {
                    "onUpdate:modelValue": k[17] || (k[17] = (P) => i.value = P),
                    class: "settings-input",
                    type: "text",
                    placeholder: a(s).label("搜索任务名、Agent、调度表达式", "Search by name, agent, or schedule")
                  }, null, 8, Gh), [
                    [Ne, i.value]
                  ])
                ])
              ]),
              n("div", Bh, [
                n("button", {
                  class: _e(["pill-button", { "pill-button--active": r.value === "all" }]),
                  type: "button",
                  onClick: k[18] || (k[18] = (P) => r.value = "all")
                }, o(a(s).label(`全部 (${h.value.length})`, `All (${h.value.length})`)), 3),
                n("button", {
                  class: _e(["pill-button", { "pill-button--active": r.value === "enabled" }]),
                  type: "button",
                  onClick: k[19] || (k[19] = (P) => r.value = "enabled")
                }, o(a(s).label(`启用中 (${_.value.length})`, `Enabled (${_.value.length})`)), 3),
                n("button", {
                  class: _e(["pill-button", { "pill-button--active": r.value === "disabled" }]),
                  type: "button",
                  onClick: k[20] || (k[20] = (P) => r.value = "disabled")
                }, o(a(s).label(`已停用 (${$.value.length})`, `Disabled (${$.value.length})`)), 3)
              ]),
              x.value.length ? (m(), v("div", Hh, [
                (m(!0), v(Y, null, we(x.value, (P) => (m(), v("article", {
                  key: P.id,
                  class: "provider-card"
                }, [
                  n("header", jh, [
                    n("div", null, [
                      n("strong", null, o(P.name || P.id), 1),
                      n("p", null, o(`${P.id} · ${P.agentId}`), 1)
                    ]),
                    n("span", {
                      class: _e(["pill", T(P)])
                    }, o(L(P)), 3)
                  ]),
                  n("div", Wh, [
                    n("div", Kh, [
                      n("strong", null, o(a(s).label("调度", "Schedule")), 1),
                      n("p", null, o(P.schedule || "-"), 1)
                    ]),
                    n("div", zh, [
                      n("strong", null, o(a(s).label("任务消息", "Prompt")), 1),
                      n("p", null, o(P.prompt || "-"), 1)
                    ]),
                    n("div", qh, [
                      n("strong", null, o(a(s).label("最近执行", "Last run")), 1),
                      n("p", null, o(a(st)(P.lastRunAt)), 1),
                      n("p", null, o(a(s).label("下次执行：", "Next run: ")) + o(a(st)(P.nextRunAt)), 1)
                    ])
                  ]),
                  n("div", Jh, [
                    n("button", {
                      class: "inline-link",
                      type: "button",
                      onClick: (be) => Re(P)
                    }, o(a(s).label("编辑", "Edit")), 9, Qh),
                    n("button", {
                      class: "inline-link",
                      type: "button",
                      disabled: d.value === `run:${P.id}`,
                      onClick: (be) => Ee("run", P)
                    }, o(d.value === `run:${P.id}` ? a(s).label("执行中…", "Running…") : a(s).label("立即运行", "Run now")), 9, Yh),
                    n("button", {
                      class: "inline-link",
                      type: "button",
                      disabled: d.value === `enable:${P.id}` || d.value === `disable:${P.id}`,
                      onClick: (be) => Ee(P.enabled ? "disable" : "enable", P)
                    }, o(d.value === `enable:${P.id}` || d.value === `disable:${P.id}` ? a(s).label("处理中…", "Working…") : P.enabled ? a(s).label("停用", "Disable") : a(s).label("启用", "Enable")), 9, Zh),
                    n("button", {
                      class: "inline-link inline-link--danger",
                      type: "button",
                      disabled: d.value === `remove:${P.id}`,
                      onClick: (be) => Ee("remove", P)
                    }, o(d.value === `remove:${P.id}` ? a(s).label("删除中…", "Deleting…") : a(s).label("删除", "Delete")), 9, Xh)
                  ])
                ]))), 128))
              ])) : (m(), v("div", eg, o(a(s).label("当前筛选条件下没有匹配的任务。", "No cron jobs match the current filters.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ])
      ], 64)) : ue("", !0)
    ]));
  }
});
async function sg() {
  const [e, t, s, l] = await Promise.all([
    xe("/api/info"),
    xe("/api/dashboard/overview"),
    xe("/api/service/status"),
    xe("/api/openclaw/status")
  ]);
  return { info: e, overview: t, services: s, openclaw: l };
}
async function ng() {
  const [e, t] = await Promise.all([
    xe("/api/service/status"),
    xe("/api/web-background/report")
  ]);
  return { services: e, webReport: t };
}
async function lg() {
  const [e, t] = await Promise.all([
    xe("/api/openclaw/status"),
    xe("/api/openclaw/targets")
  ]);
  return { status: e, targets: t };
}
const ag = { class: "page-stack" }, ig = { class: "page-header" }, og = { class: "page-header__eyebrow" }, rg = { class: "page-header__title" }, cg = { class: "page-header__description" }, ug = {
  key: 0,
  class: "page-empty"
}, dg = {
  key: 1,
  class: "page-empty page-empty--error"
}, fg = {
  key: 0,
  class: "status-banner status-banner--warning"
}, pg = { class: "stat-grid" }, hg = { class: "stat-card" }, gg = { class: "stat-card" }, _g = { class: "stat-card" }, mg = { class: "stat-card__label" }, bg = { class: "list-stack" }, vg = { class: "action-row" }, yg = { class: "action-row" }, wg = {
  class: "inline-link",
  href: "/",
  target: "_blank",
  rel: "noreferrer"
}, $g = {
  key: 0,
  class: "list-stack"
}, kg = {
  key: 1,
  class: "muted-copy"
}, Sg = /* @__PURE__ */ Le({
  __name: "DashboardPage",
  setup(e) {
    let t = null;
    const s = je(), l = at(() => sg(), t, { immediate: !1 }), i = z(() => {
      var c, u;
      const r = (u = (c = l.data) == null ? void 0 : c.overview) == null ? void 0 : u.risks;
      return Array.isArray(r) ? r : [];
    });
    return Pe(() => l.data, (r) => {
      r && (t = r);
    }), ze(() => {
      l.execute({ silent: !!l.data });
    }), (r, c) => (m(), v("div", ag, [
      n("header", ig, [
        n("div", null, [
          n("p", og, o(a(s).label("首页 / First slice", "Home / First slice")), 1),
          n("h2", rg, o(a(s).label("带路首页", "Guided Home")), 1),
          n("p", cg, o(a(s).label("先回答现在能不能用、下一步该做什么，以及哪里可能有风险。", "Answer what works now, what to do next, and where risk still exists.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: c[0] || (c[0] = (u) => a(l).execute({ silent: !0 }))
        }, o(a(l).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      a(l).loading && !a(l).data ? (m(), v("div", ug, o(a(s).label("正在加载首页快照…", "Loading the home snapshot…")), 1)) : a(l).error && !a(l).data ? (m(), v("div", dg, o(a(l).error), 1)) : a(l).data ? (m(), v(Y, { key: 2 }, [
        a(l).error ? (m(), v("div", fg, o(a(s).label("已保留上一版首页快照，但后台刷新失败：", "The last home snapshot is still on screen, but the background refresh failed: ")) + o(a(l).error), 1)) : ue("", !0),
        X(oe, {
          title: a(s).label("当前可用性", "Current availability"),
          eyebrow: "Status"
        }, {
          default: le(() => {
            var u, d, g, f, p, h, _, $, x, j;
            return [
              n("div", pg, [
                n("article", hg, [
                  c[1] || (c[1] = n("p", { class: "stat-card__label" }, "Guard", -1)),
                  n("strong", null, o(((u = a(l).data.info) == null ? void 0 : u.guardVersion) || "unknown"), 1),
                  n("span", null, o(((d = a(l).data.info) == null ? void 0 : d.platform) || "unknown platform"), 1)
                ]),
                n("article", gg, [
                  c[2] || (c[2] = n("p", { class: "stat-card__label" }, "OpenClaw", -1)),
                  n("strong", null, o((f = (g = a(l).data.info) == null ? void 0 : g.openclaw) != null && f.installed ? ((h = (p = a(l).data.info) == null ? void 0 : p.openclaw) == null ? void 0 : h.version) || "installed" : a(s).label("未安装", "Not installed")), 1),
                  n("span", null, o((($ = (_ = a(l).data.info) == null ? void 0 : _.openclaw) == null ? void 0 : $.detectedSource) || a(s).label("待检测", "Pending detection")), 1)
                ]),
                n("article", _g, [
                  n("p", mg, o(a(s).label("Node 运行时", "Node runtime")), 1),
                  n("strong", null, o(((x = a(l).data.info) == null ? void 0 : x.nodeVersion) || "unknown"), 1),
                  n("span", null, o(((j = a(l).data.info) == null ? void 0 : j.user) || a(s).label("用户未知", "Unknown user")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        X(oe, {
          title: a(s).label("建议动作", "Suggested actions"),
          eyebrow: "Next"
        }, {
          default: le(() => [
            n("div", bg, [
              n("article", vg, [
                n("div", null, [
                  n("h3", null, o(a(s).label("继续迁移首页 / 运维 / OpenClaw", "Keep migrating Home / Operations / OpenClaw")), 1),
                  n("p", null, o(a(s).label("这一版 Vue 壳层已经接上真实 API，下一批继续迁移渠道、模型、安全、备份与恢复。", "This Vue shell already talks to real APIs; next we migrate Channels, Models, Security, and Recovery.")), 1)
                ]),
                X(a(Rl), {
                  class: "inline-link",
                  to: "/operations"
                }, {
                  default: le(() => [
                    wl(o(a(s).label("查看运维页", "Open operations")), 1)
                  ]),
                  _: 1
                })
              ]),
              n("article", yg, [
                n("div", null, [
                  n("h3", null, o(a(s).label("保持旧控制台可用", "Keep the legacy console available")), 1),
                  n("p", null, o(a(s).label("新壳层目前是开发线入口，不替换正式运行时。需要完整能力时仍可打开当前正式控制台。", "The new shell is a dev-line entry for now and does not replace the production runtime yet.")), 1)
                ]),
                n("a", wg, o(a(s).label("打开正式控制台", "Open production console")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        X(oe, {
          title: a(s).label("风险提示", "Risk summary"),
          eyebrow: "Risk"
        }, {
          default: le(() => [
            i.value.length ? (m(), v("div", $g, [
              (m(!0), v(Y, null, we(i.value, (u, d) => (m(), v("article", {
                key: `${u.title}-${d}`,
                class: "risk-row"
              }, [
                n("strong", null, o(u.title || a(s).label("未命名风险", "Unnamed risk")), 1),
                n("span", null, o(u.detail || a(s).label("暂无详细描述。", "No detail provided.")), 1)
              ]))), 128))
            ])) : (m(), v("p", kg, o(a(s).label("当前 API 未返回结构化风险列表，因此这里先显示为安全占位。后续页面迁移时会继续精炼。", "The current API did not return structured risks, so this section stays intentionally lightweight for the first scaffold.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : ue("", !0)
    ]));
  }
}), Cg = {
  class: "page-tabs",
  role: "tablist"
}, xg = ["aria-selected", "onClick"], Rg = { key: 0 }, Sn = /* @__PURE__ */ Le({
  __name: "PageTabs",
  props: {
    items: {},
    activeId: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const s = t;
    return (l, i) => (m(), v("div", Cg, [
      (m(!0), v(Y, null, we(e.items, (r) => (m(), v("button", {
        key: r.id,
        class: _e(["page-tabs__button", { "page-tabs__button--active": r.id === e.activeId }]),
        type: "button",
        role: "tab",
        "aria-selected": r.id === e.activeId,
        onClick: (c) => s("change", r.id)
      }, [
        n("span", null, o(r.label), 1),
        r.hint ? (m(), v("small", Rg, o(r.hint), 1)) : ue("", !0)
      ], 10, xg))), 128))
    ]));
  }
});
function Eg(e) {
  const t = new URLSearchParams();
  e && t.set("path", e);
  const s = t.size ? `?${t.toString()}` : "";
  return xe(`/api/files${s}`);
}
function La(e) {
  const t = new URLSearchParams({ path: e });
  return xe(`/api/files/content?${t.toString()}`);
}
function Tg(e, t) {
  return De("/api/files/content", {
    path: e,
    content: t
  });
}
function Ag(e, t, s) {
  return De("/api/files/create", {
    parentPath: e,
    name: t,
    kind: s
  });
}
function Pg() {
  return xe("/api/memory");
}
function nl(e) {
  const t = String(e || "").replace(/\\/g, "/"), s = t.split("/").pop() || "";
  return ["SOUL.md", "USER.md", "AGENTS.md", "MEMORY.md"].includes(s) ? !0 : /\/memory\/.+\.md$/i.test(t);
}
function As(e) {
  const t = String(e || "").replace(/[\\/]+$/, "");
  if (!t) return "";
  const s = Math.max(t.lastIndexOf("/"), t.lastIndexOf("\\"));
  return s >= 0 ? t.slice(0, s) : "";
}
const Tl = /* @__PURE__ */ yn("workspace", () => {
  const e = /* @__PURE__ */ H("all"), t = /* @__PURE__ */ H(""), s = /* @__PURE__ */ H(""), l = /* @__PURE__ */ H(""), i = /* @__PURE__ */ H("all"), r = /* @__PURE__ */ H(""), c = /* @__PURE__ */ H(""), u = /* @__PURE__ */ H(null);
  function d(V) {
    e.value = V;
  }
  function g(V) {
    t.value = V;
  }
  function f(V) {
    s.value = V, V && (t.value = As(V) || t.value);
  }
  function p(V) {
    l.value = V;
  }
  function h(V) {
    i.value = V;
  }
  function _(V) {
    r.value = V;
  }
  function $(V) {
    c.value = V;
  }
  function x(V) {
    const F = nl(V) ? "memory" : "all";
    u.value = {
      path: V,
      mode: F,
      parentPath: As(V)
    }, e.value = F, F === "memory" ? l.value = V : (s.value = V, t.value = As(V) || t.value);
  }
  function j() {
    const V = u.value;
    return u.value = null, V;
  }
  return {
    mode: e,
    currentPath: t,
    selectedFilePath: s,
    selectedMemoryFilePath: l,
    memoryKindFilter: i,
    memoryFilterQuery: r,
    searchQuery: c,
    pendingReveal: u,
    setMode: d,
    setCurrentPath: g,
    setSelectedFilePath: f,
    setSelectedMemoryFilePath: p,
    setMemoryKindFilter: h,
    setMemoryFilterQuery: _,
    setSearchQuery: $,
    requestReveal: x,
    consumeReveal: j
  };
}), Og = { class: "page-stack" }, Mg = { class: "page-header" }, Ig = { class: "page-header__eyebrow" }, Ng = { class: "page-header__title" }, Dg = { class: "page-header__description" }, Lg = {
  key: 0,
  class: "page-empty"
}, Fg = {
  key: 1,
  class: "page-empty page-empty--error"
}, Ug = { class: "stat-grid" }, Vg = { class: "stat-card" }, Gg = { class: "stat-card__label" }, Bg = { class: "stat-card" }, Hg = { class: "stat-card__label" }, jg = { class: "stat-card" }, Wg = { class: "stat-card__label" }, Kg = { class: "stat-card" }, zg = { class: "stat-card__label" }, qg = { class: "page-two-column" }, Jg = { class: "list-stack" }, Qg = { class: "catalog-list" }, Yg = ["onClick"], Zg = { class: "catalog-list__title" }, Xg = { class: "pill-row" }, e_ = { class: "pill pill--info" }, t_ = { class: "mini-list" }, s_ = { class: "mini-list__item mini-list__item--stack" }, n_ = { class: "page-actions" }, l_ = ["disabled"], a_ = { class: "create-row" }, i_ = { value: "file" }, o_ = { value: "directory" }, r_ = ["placeholder", "onKeydown"], c_ = ["disabled"], u_ = {
  key: 0,
  class: "directory-list"
}, d_ = ["onClick"], f_ = { class: "entry-button__title" }, p_ = { class: "pill-row" }, h_ = { class: "pill pill--muted" }, g_ = {
  key: 1,
  class: "page-empty"
}, __ = {
  key: 0,
  class: "page-empty"
}, m_ = { class: "mini-list" }, b_ = { class: "mini-list__item mini-list__item--stack" }, v_ = { key: 0 }, y_ = { class: "page-actions" }, w_ = ["disabled"], $_ = {
  key: 2,
  class: "page-empty"
}, k_ = { class: "stat-grid" }, S_ = { class: "stat-card" }, C_ = { class: "stat-card__label" }, x_ = { class: "stat-card" }, R_ = { class: "stat-card__label" }, E_ = { class: "stat-card" }, T_ = { class: "stat-card__label" }, A_ = { class: "stat-card" }, P_ = { class: "stat-card__label" }, O_ = { class: "page-two-column" }, M_ = { class: "settings-field" }, I_ = ["value", "placeholder"], N_ = { class: "pill-row" }, D_ = ["onClick"], L_ = { class: "muted-copy" }, F_ = {
  key: 0,
  class: "page-empty"
}, U_ = {
  key: 1,
  class: "provider-stack"
}, V_ = { class: "provider-card__header" }, G_ = { key: 0 }, B_ = { class: "pill-row" }, H_ = { class: "pill pill--info" }, j_ = { class: "pill pill--muted" }, W_ = { class: "pill pill--muted" }, K_ = { class: "directory-list" }, z_ = ["onClick"], q_ = { class: "entry-button__title" }, J_ = { class: "pill-row" }, Q_ = { class: "pill pill--muted" }, Y_ = {
  key: 2,
  class: "page-empty"
}, Z_ = {
  key: 0,
  class: "page-empty"
}, X_ = { class: "mini-list" }, em = { class: "mini-list__item mini-list__item--stack" }, tm = { class: "page-actions" }, sm = ["disabled"], nm = {
  key: 2,
  class: "page-empty"
}, lm = /* @__PURE__ */ Le({
  __name: "FilesPage",
  setup(e) {
    const t = je(), s = it(), l = Tl(), i = /* @__PURE__ */ H(!0), r = /* @__PURE__ */ H(!1), c = /* @__PURE__ */ H(!1), u = /* @__PURE__ */ H(!1), d = /* @__PURE__ */ H(null), g = /* @__PURE__ */ H(null), f = /* @__PURE__ */ H(null), p = /* @__PURE__ */ H([]), h = /* @__PURE__ */ H(null), _ = /* @__PURE__ */ H(""), $ = /* @__PURE__ */ H(""), x = /* @__PURE__ */ H(null), j = /* @__PURE__ */ H(""), V = /* @__PURE__ */ H(""), F = /* @__PURE__ */ H(!1), W = /* @__PURE__ */ H(!1), N = /* @__PURE__ */ H("file"), Z = /* @__PURE__ */ H(""), L = z(() => [
      {
        id: "all",
        label: t.label("全部文件", "All files"),
        hint: t.label("浏览受 Guard 管理的工作区目录", "Browse Guard-managed workspace directories")
      },
      {
        id: "memory",
        label: t.label("核心记忆", "Core memory"),
        hint: t.label("集中查看 SOUL / USER / AGENTS / MEMORY 与 memory/", "Focus on SOUL / USER / AGENTS / MEMORY and memory/")
      }
    ]), T = z(() => l.mode === "memory" ? g.value : d.value), y = z(() => {
      var R;
      return ((R = f.value) == null ? void 0 : R.roots) || [];
    }), C = z(() => {
      var R;
      return ((R = f.value) == null ? void 0 : R.entries) || [];
    }), A = z(() => {
      var R;
      return ((R = f.value) == null ? void 0 : R.currentPath) || l.currentPath;
    }), ce = z(() => {
      var R;
      return ((R = f.value) == null ? void 0 : R.parentPath) || null;
    }), re = z(() => y.value.filter((R) => A.value === R.path || A.value.startsWith(`${R.path}\\`) || A.value.startsWith(`${R.path}/`)).sort((R, D) => D.path.length - R.path.length)[0] || null), pe = z(() => C.value.filter((R) => R.isDirectory).length), Re = z(() => C.value.length - pe.value), Ee = z(() => p.value), G = z(() => {
      const R = l.memoryFilterQuery.trim().toLowerCase();
      return Ee.value.filter((D) => l.memoryKindFilter !== "all" && be(D) !== l.memoryKindFilter ? !1 : R ? [
        D.agentId,
        D.type,
        D.relativePath,
        D.path
      ].join(" ").toLowerCase().includes(R) : !0).sort((D, E) => {
        const ne = String(D.agentId || "").localeCompare(String(E.agentId || ""));
        if (ne !== 0) return ne;
        const ve = be(D).localeCompare(be(E));
        return ve !== 0 ? ve : q(D).localeCompare(q(E));
      });
    }), k = z(() => {
      var D;
      const R = /* @__PURE__ */ new Map();
      for (const E of G.value) {
        const ne = String(E.agentId || "");
        R.has(ne) || R.set(ne, []), (D = R.get(ne)) == null || D.push(E);
      }
      return Array.from(R.entries()).map(([E, ne]) => ({
        agentId: E,
        label: K(E),
        files: ne,
        docsCount: ne.filter((ve) => be(ve) === "docs").length,
        notesCount: ne.filter((ve) => be(ve) === "notes").length
      })).sort((E, ne) => E.label.localeCompare(ne.label));
    });
    function P(R) {
      return R.replace(/\r\n/g, `
`);
    }
    function be(R) {
      return R.type === "memory" ? "notes" : "docs";
    }
    function fe(R) {
      return R === "docs" ? t.label("核心文档", "Core docs") : R === "notes" ? t.label("记忆片段", "Memory notes") : t.label("全部", "All");
    }
    function K(R) {
      if (!R) return t.label("未分组", "Ungrouped");
      if (!R.startsWith("detected:")) return R;
      const D = R.slice(9) || "workspace";
      return t.label(`自动发现：${D}`, `Auto-detected: ${D}`);
    }
    function q(R) {
      if (R.type === "memory") {
        const D = R.relativePath.split(/[\\/]/);
        return D[D.length - 1] || R.relativePath;
      }
      return R.type;
    }
    function ae(R) {
      return R === "file" ? h.value !== null && P(_.value) !== $.value : x.value !== null && P(j.value) !== V.value;
    }
    async function Se(R) {
      if (!ae(R)) return !0;
      const D = R === "memory";
      return s.confirm({
        title: t.label(D ? "切换记忆文件" : "切换文件", D ? "Switch memory file" : "Switch file"),
        message: t.label(
          D ? "当前记忆编辑器里有未保存修改，继续切换会丢失这些内容。" : "当前文件编辑器里有未保存修改，继续切换会丢失这些内容。",
          D ? "There are unsaved changes in the memory editor. Switching now discards them." : "There are unsaved changes in the file editor. Switching now discards them."
        ),
        confirmLabel: t.label("放弃并继续", "Discard and continue"),
        cancelLabel: t.label("取消", "Cancel"),
        tone: "danger"
      });
    }
    async function Ge(R, D = !1) {
      D || (r.value = !0), d.value = null;
      try {
        const E = await Eg(R);
        f.value = E, l.setCurrentPath(E.currentPath);
      } catch (E) {
        d.value = E instanceof Error ? E.message : String(E);
      } finally {
        r.value = !1;
      }
    }
    async function We(R = !1) {
      R || (c.value = !0), g.value = null;
      try {
        const D = await Pg();
        p.value = D.files || [];
      } catch (D) {
        g.value = D instanceof Error ? D.message : String(D);
      } finally {
        c.value = !1;
      }
    }
    async function O(R, D = !0) {
      if (D && !await Se("file")) return !1;
      u.value = !0;
      try {
        const E = await La(R);
        return h.value = E, _.value = E.content || "", $.value = P(E.content || ""), l.setSelectedFilePath(R), !0;
      } catch (E) {
        return s.pushToast({
          tone: "error",
          message: E instanceof Error ? E.message : String(E)
        }), !1;
      } finally {
        u.value = !1;
      }
    }
    async function ie(R, D = !0) {
      if (D && !await Se("memory")) return !1;
      u.value = !0;
      try {
        const E = await La(R);
        return x.value = E, j.value = E.content || "", V.value = P(E.content || ""), l.setSelectedMemoryFilePath(R), !0;
      } catch (E) {
        return s.pushToast({
          tone: "error",
          message: E instanceof Error ? E.message : String(E)
        }), !1;
      } finally {
        u.value = !1;
      }
    }
    async function te() {
      const R = l.currentPath || As(l.selectedFilePath) || void 0;
      await Ge(R, !0), l.selectedFilePath && await O(l.selectedFilePath, !1);
    }
    async function de() {
      await We(!0), l.selectedMemoryFilePath && await ie(l.selectedMemoryFilePath, !1);
    }
    async function ke(R, D, E = !0) {
      if (D === "memory") {
        if (l.mode === "all" && E && !await Se("file")) return;
        l.setMode("memory"), await We(!0), R && await ie(R, !1);
        return;
      }
      l.mode === "memory" && E && !await Se("memory") || (l.setMode("all"), await Ge(As(R) || l.currentPath || void 0, !0), R && await O(R, !1));
    }
    async function b(R) {
      var ne, ve;
      const D = R === "memory" ? "memory" : "all";
      if (D === l.mode) return;
      const E = D === "memory" ? l.selectedMemoryFilePath || ((ne = x.value) == null ? void 0 : ne.path) || "" : l.selectedFilePath || ((ve = h.value) == null ? void 0 : ve.path) || "";
      await ke(E, D, !0), D === "all" && !E && (l.setMode("all"), await Ge(l.currentPath || void 0, !0)), D === "memory" && !E && (l.setMode("memory"), await We(!0));
    }
    async function w(R) {
      if (R.isDirectory) {
        if (!await Se("file")) return;
        h.value = null, _.value = "", $.value = "", l.setSelectedFilePath(""), await Ge(R.path);
        return;
      }
      await O(R.path, !0);
    }
    async function S(R) {
      await Se("file") && (h.value = null, _.value = "", $.value = "", l.setSelectedFilePath(""), await Ge(R));
    }
    async function M() {
      ce.value && await Se("file") && (h.value = null, _.value = "", $.value = "", l.setSelectedFilePath(""), await Ge(ce.value));
    }
    async function U() {
      await Ge(A.value || void 0, !0);
    }
    async function I() {
      var R;
      (R = h.value) != null && R.path && await O(h.value.path, !0);
    }
    async function ee() {
      var R;
      (R = x.value) != null && R.path && await ie(x.value.path, !0);
    }
    async function Q(R) {
      const D = R === "file" ? h.value : x.value, E = R === "file" ? _.value : j.value;
      if (D != null && D.path) {
        F.value = !0;
        try {
          const ne = await Tg(D.path, E);
          s.pushToast({
            tone: ne.success ? "success" : "error",
            message: ne.message
          }), ne.success && (R === "file" ? ($.value = P(E), h.value && (h.value.content = E), await Ge(A.value || void 0, !0)) : (V.value = P(E), x.value && (x.value.content = E), await We(!0)));
        } catch (ne) {
          s.pushToast({
            tone: "error",
            message: ne instanceof Error ? ne.message : String(ne)
          });
        } finally {
          F.value = !1;
        }
      }
    }
    async function J() {
      const R = A.value;
      if (!R) return;
      const D = Z.value.trim();
      if (!D) {
        s.pushToast({
          tone: "warning",
          message: t.label("请输入要创建的文件名或目录名。", "Enter the file or directory name first.")
        });
        return;
      }
      W.value = !0;
      try {
        const E = await Ag(R, D, N.value);
        s.pushToast({
          tone: E.success ? "success" : "error",
          message: E.message
        }), E.success && (Z.value = "", await Ge(R, !0), N.value === "file" && E.path && await O(E.path, !1));
      } catch (E) {
        s.pushToast({
          tone: "error",
          message: E instanceof Error ? E.message : String(E)
        });
      } finally {
        W.value = !1;
      }
    }
    function B(R) {
      l.setMemoryKindFilter(R === "docs" || R === "notes" ? R : "all");
    }
    async function he() {
      var R;
      (R = x.value) != null && R.path && await ke(x.value.path, "all", !0);
    }
    async function se() {
      i.value = !0;
      const R = l.consumeReveal();
      if (R != null && R.path) {
        await ke(R.path, R.mode, !1), i.value = !1;
        return;
      }
      l.mode === "memory" ? await de() : await te(), i.value = !1;
    }
    return ze(() => {
      se();
    }), (R, D) => (m(), v("div", Og, [
      n("header", Mg, [
        n("div", null, [
          n("p", Ig, o(a(t).label("文件 / Third slice", "Files / Third slice")), 1),
          n("h2", Ng, o(a(t).label("文件与记忆", "Files and memory")), 1),
          n("p", Dg, o(a(t).label("保留“全部文件”和“核心记忆”双视图，让搜索、角色工作区和实际编辑动作都能在新壳层里接得上。", "Keep both the All Files and Core Memory views so search results, role workspaces, and real editing actions can all land cleanly in the new shell.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: se
        }, o(i.value || r.value || c.value ? a(t).label("刷新中…", "Refreshing…") : a(t).label("Refresh", "Refresh")), 1)
      ]),
      X(Sn, {
        items: L.value,
        "active-id": a(l).mode,
        onChange: b
      }, null, 8, ["items", "active-id"]),
      i.value ? (m(), v("div", Lg, o(a(t).label("正在恢复文件视图…", "Restoring the workspace view…")), 1)) : T.value && (a(l).mode === "all" && !f.value || a(l).mode === "memory" && !p.value.length) ? (m(), v("div", Fg, o(T.value), 1)) : a(l).mode === "all" ? (m(), v(Y, { key: 2 }, [
        X(oe, {
          title: a(t).label("当前目录概览", "Current directory overview"),
          eyebrow: "Summary"
        }, {
          default: le(() => {
            var E, ne, ve;
            return [
              n("div", Ug, [
                n("article", Vg, [
                  n("p", Gg, o(a(t).label("受控根目录", "Managed roots")), 1),
                  n("strong", null, o(a(ge)(y.value.length)), 1),
                  n("span", null, o(((E = re.value) == null ? void 0 : E.label) || a(t).label("当前正在受控范围内浏览", "Browsing inside the managed scope now")), 1)
                ]),
                n("article", Bg, [
                  n("p", Hg, o(a(t).label("当前目录内容", "Current entries")), 1),
                  n("strong", null, o(a(ge)(C.value.length)), 1),
                  n("span", null, o(`${a(ge)(pe.value)} ${a(t).label("个目录", "dirs")} / ${a(ge)(Re.value)} ${a(t).label("个文件", "files")}`), 1)
                ]),
                n("article", jg, [
                  n("p", Wg, o(a(t).label("当前打开文件", "Open file")), 1),
                  n("strong", null, o(h.value ? "1" : "0"), 1),
                  n("span", null, o(((ne = h.value) == null ? void 0 : ne.relativePath) || a(t).label("还没有打开文件", "No file opened yet")), 1)
                ]),
                n("article", Kg, [
                  n("p", zg, o(a(t).label("当前路径", "Current path")), 1),
                  n("strong", null, o(((ve = re.value) == null ? void 0 : ve.type) === "detected-workspace" ? a(t).label("自动发现", "Auto-detected") : a(t).label("受控目录", "Managed")), 1),
                  n("span", null, o(A.value || a(t).label("等待路径返回", "Waiting for a resolved path")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        n("div", qg, [
          X(oe, {
            title: a(t).label("工作区浏览器", "Workspace browser"),
            eyebrow: "Browser"
          }, {
            default: le(() => [
              n("div", Jg, [
                n("div", Qg, [
                  (m(!0), v(Y, null, we(y.value, (E) => (m(), v("button", {
                    key: E.id,
                    class: _e(["catalog-list__item", { "catalog-list__item--active": A.value === E.path || A.value.startsWith(`${E.path}\\`) || A.value.startsWith(`${E.path}/`) }]),
                    type: "button",
                    onClick: (ne) => S(E.path)
                  }, [
                    n("div", Zg, [
                      n("strong", null, o(E.label), 1)
                    ]),
                    n("div", Xg, [
                      n("span", e_, o(E.type), 1)
                    ])
                  ], 10, Yg))), 128))
                ]),
                n("div", t_, [
                  n("div", s_, [
                    n("strong", null, o(a(t).label("当前路径", "Current path")), 1),
                    n("p", null, o(A.value || "-"), 1)
                  ])
                ]),
                n("div", n_, [
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: !ce.value,
                    onClick: M
                  }, o(a(t).label("返回上一级", "Go up")), 9, l_),
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: U
                  }, o(r.value ? a(t).label("刷新中…", "Refreshing…") : a(t).label("刷新目录", "Reload list")), 1)
                ]),
                n("div", a_, [
                  $e(n("select", {
                    "onUpdate:modelValue": D[0] || (D[0] = (E) => N.value = E),
                    class: "settings-input create-row__kind"
                  }, [
                    n("option", i_, o(a(t).label("文件", "File")), 1),
                    n("option", o_, o(a(t).label("目录", "Directory")), 1)
                  ], 512), [
                    [ft, N.value]
                  ]),
                  $e(n("input", {
                    "onUpdate:modelValue": D[1] || (D[1] = (E) => Z.value = E),
                    class: "settings-input",
                    type: "text",
                    placeholder: a(t).label("例如：README-local.md 或 drafts", "Example: README-local.md or drafts"),
                    onKeydown: Vc(_s(J, ["prevent"]), ["enter"])
                  }, null, 40, r_), [
                    [Ne, Z.value]
                  ]),
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: W.value,
                    onClick: J
                  }, o(W.value ? a(t).label("创建中…", "Creating…") : a(t).label("创建", "Create")), 9, c_)
                ]),
                C.value.length ? (m(), v("div", u_, [
                  (m(!0), v(Y, null, we(C.value, (E) => {
                    var ne;
                    return m(), v("button", {
                      key: E.path,
                      class: _e(["entry-button", { "entry-button--active": ((ne = h.value) == null ? void 0 : ne.path) === E.path }]),
                      type: "button",
                      onClick: (ve) => w(E)
                    }, [
                      n("div", f_, [
                        n("strong", null, o(E.isDirectory ? `${a(t).label("[目录]", "[DIR]")} ${E.name}` : E.name), 1)
                      ]),
                      n("p", null, o(E.relativePath || E.path), 1),
                      n("div", p_, [
                        n("span", {
                          class: _e(["pill", E.isDirectory ? "pill--info" : "pill--muted"])
                        }, o(E.isDirectory ? a(t).label("目录", "Directory") : a(Rf)(E.size)), 3),
                        n("span", h_, o(a(st)(E.modifiedAt)), 1)
                      ])
                    ], 10, d_);
                  }), 128))
                ])) : (m(), v("div", g_, o(a(t).label("当前目录下还没有可展示内容。", "The current directory does not contain any visible entries yet.")), 1))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(oe, {
            title: a(t).label("文件编辑器", "File editor"),
            eyebrow: "Editor"
          }, {
            default: le(() => [
              u.value ? (m(), v("div", __, o(a(t).label("正在读取文件内容…", "Loading file content…")), 1)) : h.value ? (m(), v(Y, { key: 1 }, [
                n("div", m_, [
                  n("div", b_, [
                    n("strong", null, o(h.value.relativePath || h.value.path), 1),
                    n("p", null, o(h.value.path), 1),
                    h.value.truncated ? (m(), v("p", v_, o(a(t).label("文件内容过长，当前只预览了前一部分。", "This file is large, so only the first portion is loaded for preview and editing.")), 1)) : ue("", !0)
                  ])
                ]),
                n("div", y_, [
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: I
                  }, o(a(t).label("重新读取", "Reload")), 1),
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: F.value,
                    onClick: D[2] || (D[2] = (E) => Q("file"))
                  }, o(F.value ? a(t).label("保存中…", "Saving…") : a(t).label("保存文件", "Save file")), 9, w_)
                ]),
                $e(n("textarea", {
                  "onUpdate:modelValue": D[3] || (D[3] = (E) => _.value = E),
                  class: "settings-textarea settings-textarea--editor",
                  rows: "22"
                }, null, 512), [
                  [Ne, _.value]
                ])
              ], 64)) : (m(), v("div", $_, o(a(t).label("先从左侧选择一个文件，再在这里查看或编辑。", "Select a file from the left side first, then view or edit it here.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ])
      ], 64)) : (m(), v(Y, { key: 3 }, [
        X(oe, {
          title: a(t).label("核心记忆概览", "Core memory overview"),
          eyebrow: "Summary"
        }, {
          default: le(() => {
            var E;
            return [
              n("div", k_, [
                n("article", S_, [
                  n("p", C_, o(a(t).label("记忆文件数", "Memory files")), 1),
                  n("strong", null, o(a(ge)(Ee.value.length)), 1),
                  n("span", null, o(`${a(ge)(Ee.value.filter((ne) => ne.type !== "memory").length)} ${a(t).label("个核心文档", "core docs")} / ${a(ge)(Ee.value.filter((ne) => ne.type === "memory").length)} ${a(t).label("个记忆片段", "memory notes")}`), 1)
                ]),
                n("article", x_, [
                  n("p", R_, o(a(t).label("覆盖角色", "Covered roles")), 1),
                  n("strong", null, o(a(ge)(k.value.length)), 1),
                  n("span", null, o(a(t).label("包含可管理记忆文件的角色或工作区", "Roles or workspaces that already have managed memory files")), 1)
                ]),
                n("article", E_, [
                  n("p", T_, o(a(t).label("当前显示", "Visible now")), 1),
                  n("strong", null, o(a(ge)(G.value.length)), 1),
                  n("span", null, o(`${fe(a(l).memoryKindFilter)} / ${a(l).memoryFilterQuery || a(t).label("未设置搜索词", "No search query")}`), 1)
                ]),
                n("article", A_, [
                  n("p", P_, o(a(t).label("当前打开", "Current file")), 1),
                  n("strong", null, o(x.value ? "1" : "0"), 1),
                  n("span", null, o(((E = x.value) == null ? void 0 : E.relativePath) || a(t).label("还没有打开记忆文件", "No memory file opened yet")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        n("div", O_, [
          X(oe, {
            title: a(t).label("记忆目录", "Memory catalog"),
            eyebrow: "Catalog"
          }, {
            default: le(() => [
              n("div", M_, [
                n("span", null, o(a(t).label("筛选", "Filter")), 1),
                n("input", {
                  value: a(l).memoryFilterQuery,
                  class: "settings-input",
                  type: "text",
                  placeholder: a(t).label("搜索 Agent / 文件名 / 路径", "Filter by agent / file / path"),
                  onInput: D[4] || (D[4] = (E) => a(l).setMemoryFilterQuery(E.target.value))
                }, null, 40, I_)
              ]),
              n("div", N_, [
                (m(), v(Y, null, we(["all", "docs", "notes"], (E) => n("button", {
                  key: E,
                  class: _e(["pill-button", { "pill-button--active": a(l).memoryKindFilter === E }]),
                  type: "button",
                  onClick: (ne) => B(E)
                }, [
                  n("span", null, o(fe(E)), 1)
                ], 10, D_)), 64))
              ]),
              n("p", L_, o(a(t).label(`当前显示 ${a(ge)(G.value.length)} / ${a(ge)(Ee.value.length)} 个记忆文件。`, `Showing ${a(ge)(G.value.length)} of ${a(ge)(Ee.value.length)} memory files.`)), 1),
              c.value ? (m(), v("div", F_, o(a(t).label("正在读取记忆目录…", "Loading the memory catalog…")), 1)) : k.value.length ? (m(), v("div", U_, [
                (m(!0), v(Y, null, we(k.value, (E) => (m(), v("article", {
                  key: E.agentId,
                  class: "provider-card"
                }, [
                  n("header", V_, [
                    n("div", null, [
                      n("strong", null, o(E.label), 1),
                      E.label !== E.agentId ? (m(), v("p", G_, o(E.agentId), 1)) : ue("", !0)
                    ]),
                    n("div", B_, [
                      n("span", H_, o(a(ge)(E.files.length)), 1),
                      n("span", j_, o(`${fe("docs")} ${a(ge)(E.docsCount)}`), 1),
                      n("span", W_, o(`${fe("notes")} ${a(ge)(E.notesCount)}`), 1)
                    ])
                  ]),
                  n("div", K_, [
                    (m(!0), v(Y, null, we(E.files, (ne) => {
                      var ve;
                      return m(), v("button", {
                        key: ne.path,
                        class: _e(["entry-button", { "entry-button--active": ((ve = x.value) == null ? void 0 : ve.path) === ne.path }]),
                        type: "button",
                        onClick: (Ye) => ie(ne.path)
                      }, [
                        n("div", q_, [
                          n("strong", null, o(q(ne)), 1)
                        ]),
                        n("p", null, o(ne.relativePath || ne.path), 1),
                        n("div", J_, [
                          n("span", {
                            class: _e(["pill", be(ne) === "docs" ? "pill--info" : "pill--success"])
                          }, o(fe(be(ne))), 3),
                          n("span", Q_, o(a(st)(ne.modifiedAt)), 1)
                        ])
                      ], 10, z_);
                    }), 128))
                  ])
                ]))), 128))
              ])) : (m(), v("div", Y_, o(a(t).label("当前筛选条件下没有匹配的核心记忆文件。", "No core memory files match the current filter.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          X(oe, {
            title: a(t).label("记忆编辑器", "Memory editor"),
            eyebrow: "Editor"
          }, {
            default: le(() => [
              u.value ? (m(), v("div", Z_, o(a(t).label("正在读取记忆文件…", "Loading the memory file…")), 1)) : x.value ? (m(), v(Y, { key: 1 }, [
                n("div", X_, [
                  n("div", em, [
                    n("strong", null, o(x.value.relativePath || x.value.path), 1),
                    n("p", null, o(x.value.path), 1),
                    n("p", null, o(a(t).label("修改后记得保存，这些内容会直接影响对应角色的行为、人格和长期记忆。", "Save after editing. These files directly affect role behavior, persona, and long-term memory.")), 1)
                  ])
                ]),
                n("div", tm, [
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: ee
                  }, o(a(t).label("重新读取", "Reload")), 1),
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: he
                  }, o(a(t).label("在全部文件中定位", "Reveal in all files")), 1),
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: F.value,
                    onClick: D[5] || (D[5] = (E) => Q("memory"))
                  }, o(F.value ? a(t).label("保存中…", "Saving…") : a(t).label("保存记忆文件", "Save memory file")), 9, sm)
                ]),
                $e(n("textarea", {
                  "onUpdate:modelValue": D[6] || (D[6] = (E) => j.value = E),
                  class: "settings-textarea settings-textarea--editor",
                  rows: "22"
                }, null, 512), [
                  [Ne, j.value]
                ])
              ], 64)) : (m(), v("div", nm, o(a(t).label("先从左侧选择一个记忆文件，再在这里查看或编辑。", "Select a memory file from the left side first, then view or edit it here.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ])
      ], 64))
    ]));
  }
});
async function am(e = 200) {
  const t = await xe(`/api/service/logs?lines=${encodeURIComponent(String(e))}`);
  return {
    logs: Array.isArray(t.logs) ? t.logs.map((s) => String(s)) : [],
    requestedLines: e
  };
}
const im = { class: "page-stack" }, om = { class: "page-header" }, rm = { class: "page-header__eyebrow" }, cm = { class: "page-header__title" }, um = { class: "page-header__description" }, dm = {
  key: 0,
  class: "page-empty"
}, fm = {
  key: 1,
  class: "page-empty page-empty--error"
}, pm = { class: "stat-grid" }, hm = { class: "stat-card" }, gm = { class: "stat-card__label" }, _m = { class: "stat-card" }, mm = { class: "stat-card__label" }, bm = { class: "stat-card" }, vm = { class: "stat-card__label" }, ym = { class: "stat-card" }, wm = { class: "stat-card__label" }, $m = {
  key: 0,
  class: "status-banner status-banner--warning"
}, km = { class: "page-actions" }, Sm = ["onClick"], Cm = {
  key: 0,
  class: "status-banner status-banner--warning"
}, xm = { class: "code-panel log-output" }, Rm = /* @__PURE__ */ Le({
  __name: "LogsPage",
  setup(e) {
    let t = null;
    const s = je(), l = it(), i = /* @__PURE__ */ H((t == null ? void 0 : t.requestedLines) || 200), r = at(() => am(i.value), t, { immediate: !1 }), c = [100, 200, 500], u = z(() => {
      var p;
      return ((p = r.data) == null ? void 0 : p.logs) || [];
    }), d = z(() => /^(获取日志失败|Failed to fetch logs)/.test(u.value[0] || ""));
    Pe(() => r.data, (p) => {
      p && (t = p);
    }), ze(() => {
      r.execute({ silent: !!r.data });
    });
    async function g(p) {
      typeof p == "number" && (i.value = p), await r.execute({ silent: !!r.data });
    }
    async function f() {
      var p;
      typeof navigator > "u" || !((p = navigator.clipboard) != null && p.writeText) || (await navigator.clipboard.writeText(u.value.join(`
`)), l.pushToast({
        tone: "success",
        message: s.label("最近日志已复制。", "The latest log lines have been copied.")
      }));
    }
    return (p, h) => (m(), v("div", im, [
      n("header", om, [
        n("div", null, [
          n("p", rm, o(a(s).label("日志 / Fourth slice", "Logs / Fourth slice")), 1),
          n("h2", cm, o(a(s).label("日志与排障", "Logs & troubleshooting")), 1),
          n("p", um, o(a(s).label("先把最常用的 Gateway 日志排障入口迁进新壳层里，支持切换日志行数、静默刷新和快速复制，避免排障时还要跳回旧控制台。", "Bring the most-used Gateway log workflow into the new shell first, with line-count switching, silent refresh, and quick copy so troubleshooting no longer depends on the old console.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: h[0] || (h[0] = (_) => g())
        }, o(a(r).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新日志", "Refresh logs")), 1)
      ]),
      a(r).loading && !a(r).data ? (m(), v("div", dm, o(a(s).label("正在读取最近日志…", "Loading the latest log lines…")), 1)) : a(r).error && !a(r).data ? (m(), v("div", fm, o(a(r).error), 1)) : a(r).data ? (m(), v(Y, { key: 2 }, [
        X(oe, {
          title: a(s).label("日志概览", "Log overview"),
          eyebrow: "Gateway"
        }, {
          default: le(() => [
            n("div", pm, [
              n("article", hm, [
                n("p", gm, o(a(s).label("日志来源", "Source")), 1),
                h[1] || (h[1] = n("strong", null, "Gateway", -1)),
                n("span", null, o(a(s).label("当前先迁移最常用的 Gateway 日志入口", "The first migrated source is the Gateway log stream")), 1)
              ]),
              n("article", _m, [
                n("p", mm, o(a(s).label("请求行数", "Requested lines")), 1),
                n("strong", null, o(a(ge)(a(r).data.requestedLines)), 1),
                n("span", null, o(a(s).label("切换后会静默拉取新结果", "Changing this refreshes the result silently")), 1)
              ]),
              n("article", bm, [
                n("p", vm, o(a(s).label("返回行数", "Returned lines")), 1),
                n("strong", null, o(a(ge)(u.value.length)), 1),
                n("span", null, o(a(s).label("展示当前接口返回的最新结果", "Shows the latest lines returned by the API")), 1)
              ]),
              n("article", ym, [
                n("p", wm, o(a(s).label("当前状态", "Current state")), 1),
                n("strong", null, o(d.value ? a(s).label("需要排查", "Needs attention") : a(s).label("可直接查看", "Ready to inspect")), 1),
                n("span", null, o(d.value ? a(s).label("接口返回了错误提示，建议先回到运维确认服务状态。", "The API returned an error banner. Confirm the service state in Operations first.") : a(s).label("如果最近刚执行过启停或重启，先看这里通常最快。", "If you recently started, stopped, or restarted services, this is usually the fastest place to check.")), 1)
              ])
            ]),
            a(r).error ? (m(), v("div", $m, o(a(s).label("已保留上一版成功结果，同时后台刷新失败：", "The last successful result is still on screen, but the background refresh failed: ")) + o(a(r).error), 1)) : ue("", !0)
          ]),
          _: 1
        }, 8, ["title"]),
        X(oe, {
          title: a(s).label("最近日志输出", "Latest log output"),
          eyebrow: "Output"
        }, {
          actions: le(() => [
            n("div", km, [
              (m(), v(Y, null, we(c, (_) => n("button", {
                key: _,
                class: _e(["pill-button", { "pill-button--active": i.value === _ }]),
                type: "button",
                onClick: ($) => g(_)
              }, o(a(s).label(`最近 ${_} 行`, `${_} lines`)), 11, Sm)), 64)),
              n("button", {
                class: "inline-link",
                type: "button",
                onClick: f
              }, o(a(s).label("复制日志", "Copy logs")), 1)
            ])
          ]),
          default: le(() => [
            d.value ? (m(), v("div", Cm, o(u.value[0]), 1)) : ue("", !0),
            n("pre", xm, o(u.value.join(`
`) || a(s).label("当前没有可显示的日志内容。", "No log content is available right now.")), 1)
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : ue("", !0)
    ]));
  }
});
async function Em() {
  const [e, t] = await Promise.all([
    xe("/api/ai/config"),
    xe("/api/ai/providers")
  ]);
  return { config: e, catalog: t };
}
function Tm(e) {
  return De("/api/ai/provider", e);
}
function Am(e) {
  return lo(`/api/ai/provider/${encodeURIComponent(e)}`);
}
function Pm(e) {
  return De("/api/ai/primary", { modelId: e });
}
function Om(e) {
  return De("/api/ai/fallbacks", { modelIds: e });
}
const Mm = { class: "page-stack" }, Im = { class: "page-header" }, Nm = { class: "page-header__eyebrow" }, Dm = { class: "page-header__title" }, Lm = { class: "page-header__description" }, Fm = {
  key: 0,
  class: "page-empty"
}, Um = {
  key: 1,
  class: "page-empty page-empty--error"
}, Vm = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Gm = { class: "stat-grid" }, Bm = { class: "stat-card" }, Hm = { class: "stat-card__label" }, jm = { class: "stat-card" }, Wm = { class: "stat-card__label" }, Km = { class: "stat-card" }, zm = { class: "stat-card__label" }, qm = { class: "stat-card" }, Jm = { class: "stat-card__label" }, Qm = { class: "settings-grid settings-grid--wide" }, Ym = { class: "settings-field" }, Zm = { value: "" }, Xm = ["value"], eb = { class: "checkbox-grid" }, tb = ["checked", "onChange"], sb = { class: "page-actions" }, nb = ["disabled"], lb = { class: "page-two-column" }, ab = { class: "catalog-list" }, ib = ["onClick"], ob = { class: "catalog-list__title" }, rb = { class: "pill-row" }, cb = { class: "page-stack" }, ub = { class: "muted-copy" }, db = { class: "settings-grid settings-grid--wide" }, fb = { class: "settings-field" }, pb = { class: "settings-field" }, hb = { class: "settings-field" }, gb = ["value"], _b = { class: "settings-field" }, mb = { class: "settings-field settings-field--full" }, bb = { class: "page-actions" }, vb = ["disabled"], yb = ["disabled"], wb = { class: "provider-stack" }, $b = { class: "provider-card__header" }, kb = { class: "pill-row" }, Sb = {
  key: 0,
  class: "pill pill--success"
}, Cb = {
  key: 1,
  class: "pill pill--muted"
}, xb = { class: "mini-list" }, Rb = { class: "pill-row" }, Eb = {
  key: 0,
  class: "pill pill--success"
}, Tb = {
  key: 1,
  class: "pill pill--info"
}, Ab = /* @__PURE__ */ Le({
  __name: "ModelsPage",
  setup(e) {
    const t = ["openai-completions", "anthropic-messages", "openai-responses"];
    let s = null;
    const l = je(), i = it(), r = at(() => Em(), s, { immediate: !1 }), c = /* @__PURE__ */ H("__new__"), u = /* @__PURE__ */ H(!1), d = /* @__PURE__ */ H(!1), g = /* @__PURE__ */ H(!1), f = /* @__PURE__ */ H(""), p = /* @__PURE__ */ H([]), h = /* @__PURE__ */ Ft({
      mode: "new",
      title: "",
      canDelete: !1,
      name: "",
      baseUrl: "",
      apiType: "openai-completions",
      apiKey: "",
      apiKeyHelp: "",
      modelsText: ""
    }), _ = z(() => {
      const T = r.data, y = (T == null ? void 0 : T.config.providers) || [], C = (T == null ? void 0 : T.catalog.presets) || [];
      return [
        { value: "__new__", label: l.label("新建空白 Provider", "Create blank provider"), kind: "new" },
        ...y.map((A) => ({
          value: A.name,
          label: `${A.name} · ${l.label("已配置", "configured")}`,
          kind: "custom"
        })),
        ...C.filter((A) => !y.some((ce) => ce.name === A.id)).map((A) => ({
          value: A.id,
          label: `${A.id} · ${l.label("预设", "preset")}`,
          kind: "preset"
        }))
      ];
    }), $ = z(() => {
      var y;
      return (((y = r.data) == null ? void 0 : y.config.providers) || []).flatMap((C) => C.models.map((A) => ({
        providerName: C.name,
        fullId: A.fullId,
        name: A.name,
        api: A.api
      })));
    });
    function x(T, y) {
      return T.map((C) => [
        C.id || "",
        C.name || C.id || "",
        C.contextWindow || "",
        C.maxTokens || "",
        C.api || y || ""
      ].join("|")).join(`
`);
    }
    function j(T, y) {
      return T.split(/\r?\n/).map((C) => C.trim()).filter(Boolean).map((C) => {
        const [A, ce, re, pe, Re] = C.split("|").map((Ee) => Ee.trim());
        return {
          id: A,
          name: ce || A,
          contextWindow: ln(re),
          maxTokens: ln(pe),
          api: Re || y || void 0
        };
      }).filter((C) => C.id);
    }
    function V(T) {
      var Ee, G;
      const y = r.data;
      if (!y) return;
      const C = y.config.providers, A = new Map(C.map((k) => [k.name, k])), ce = new Map((y.catalog.custom || []).map((k) => [k.name, k])), re = new Map((y.catalog.presets || []).map((k) => [k.id, k]));
      if (!T || T === "__new__") {
        h.mode = "new", h.title = l.label("新建 Provider", "Create provider"), h.canDelete = !1, h.name = "", h.baseUrl = "", h.apiType = "openai-completions", h.apiKey = "", h.apiKeyHelp = l.label("保存后写入 openclaw.json。", "Saved into openclaw.json after you confirm."), h.modelsText = "";
        return;
      }
      const pe = ce.get(T);
      if (pe) {
        const k = A.get(T);
        h.mode = "custom", h.title = l.label("编辑已配置 Provider", "Edit configured provider"), h.canDelete = !0, h.name = T, h.baseUrl = pe.baseUrl || "", h.apiType = pe.apiType || pe.api || ((G = (Ee = pe.models) == null ? void 0 : Ee[0]) == null ? void 0 : G.api) || "openai-completions", h.apiKey = "", h.apiKeyHelp = k != null && k.apiKeyMasked ? l.label(`留空会保留现有密钥：${k.apiKeyMasked}`, `Leave blank to keep the current key: ${k.apiKeyMasked}`) : l.label("填写后会覆盖当前密钥。", "A filled value replaces the current key."), h.modelsText = x(pe.models || [], h.apiType);
        return;
      }
      const Re = re.get(T);
      if (Re) {
        h.mode = "preset", h.title = l.label("从预设带入 Provider", "Bootstrap provider from preset"), h.canDelete = !1, h.name = Re.id, h.baseUrl = Re.defaultBaseUrl || "", h.apiType = Re.apiType || "openai-completions", h.apiKey = "", h.apiKeyHelp = Re.requiresApiKey ? l.label("保存前请填写 API Key。", "Fill in the API key before saving.") : l.label("这个 Provider 通常不需要 API Key。", "This provider usually does not require an API key."), h.modelsText = x(
          (Re.suggestedModels || []).map((k) => ({
            id: k.id,
            name: k.name,
            api: Re.apiType
          })),
          Re.apiType
        );
        return;
      }
      c.value = "__new__";
    }
    Pe(
      () => r.data,
      (T) => {
        var C;
        if (T && (s = T), !T) return;
        f.value = T.config.primaryModel || "", p.value = [...T.config.fallbackModels || []];
        const y = _.value;
        if (!y.some((A) => A.value === c.value)) {
          c.value = ((C = y[1]) == null ? void 0 : C.value) || "__new__";
          return;
        }
        V(c.value);
      },
      { immediate: !0 }
    ), Pe(c, (T) => {
      V(T);
    }), ze(() => {
      r.execute({ silent: !!r.data });
    });
    async function F() {
      u.value = !0;
      try {
        const T = await Pm(f.value);
        if (!T.success)
          throw new Error(T.message);
        const y = await Om(p.value.filter((C) => C !== f.value));
        if (!y.success)
          throw new Error(y.message);
        i.pushToast({
          tone: "success",
          message: l.label("模型路由已更新。", "Model routing was updated.")
        }), await r.execute({ silent: !0 });
      } catch (T) {
        i.pushToast({
          tone: "error",
          message: T instanceof Error ? T.message : String(T)
        });
      } finally {
        u.value = !1;
      }
    }
    async function W() {
      d.value = !0;
      try {
        const T = await Tm({
          name: h.name.trim(),
          baseUrl: h.baseUrl.trim(),
          apiKey: h.apiKey.trim() || void 0,
          apiType: h.apiType,
          models: j(h.modelsText, h.apiType)
        });
        i.pushToast({
          tone: T.success ? "success" : "error",
          message: T.message
        }), T.success && (c.value = h.name.trim() || "__new__", await r.execute({ silent: !0 }));
      } catch (T) {
        i.pushToast({
          tone: "error",
          message: T instanceof Error ? T.message : String(T)
        });
      } finally {
        d.value = !1;
      }
    }
    async function N() {
      if (!(!h.canDelete || !h.name || !await i.confirm({
        title: l.label("删除 Provider", "Delete provider"),
        message: l.label(
          `确认删除 ${h.name} 吗？这会同时移除它的模型定义、主模型引用和备用链路。`,
          `Delete ${h.name}? This also removes its model definitions, primary selection, and fallback references.`
        ),
        confirmLabel: l.label("确认删除", "Delete provider"),
        cancelLabel: l.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        g.value = !0;
        try {
          const y = await Am(h.name);
          i.pushToast({
            tone: y.success ? "success" : "error",
            message: y.message
          }), y.success && (c.value = "__new__", await r.execute({ silent: !0 }));
        } catch (y) {
          i.pushToast({
            tone: "error",
            message: y instanceof Error ? y.message : String(y)
          });
        } finally {
          g.value = !1;
        }
      }
    }
    function Z(T) {
      if (p.value.includes(T)) {
        p.value = p.value.filter((y) => y !== T);
        return;
      }
      p.value = [...p.value, T];
    }
    function L(T, y) {
      var C;
      return T ? l.label(`预设入口：${T.name}`, `Preset source: ${T.name}`) : (C = y == null ? void 0 : y.models) != null && C.length ? l.label(`当前已录入 ${y.models.length} 个模型`, `${y.models.length} model entries are recorded now`) : l.label("保存后就会写入当前 openclaw.json。", "Saving writes the provider into the active openclaw.json.");
    }
    return (T, y) => (m(), v("div", Mm, [
      n("header", Im, [
        n("div", null, [
          n("p", Nm, o(a(l).label("模型 / Second slice", "Models / Second slice")), 1),
          n("h2", Dm, o(a(l).label("模型策略", "Model strategy")), 1),
          n("p", Lm, o(a(l).label("把 Provider、主模型和 fallback 链迁到模块化页面里，同时保持当前 openclaw.json 的真实读写。", "Move providers, the primary model, and the fallback chain into the modular page while keeping real read-write access to the current openclaw.json.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: y[0] || (y[0] = (C) => a(r).execute({ silent: !0 }))
        }, o(a(r).refreshing ? a(l).label("刷新中…", "Refreshing…") : a(l).label("刷新", "Refresh")), 1)
      ]),
      a(r).loading && !a(r).data ? (m(), v("div", Fm, o(a(l).label("正在读取模型配置…", "Loading model configuration…")), 1)) : a(r).error && !a(r).data ? (m(), v("div", Um, o(a(r).error), 1)) : a(r).data ? (m(), v(Y, { key: 2 }, [
        a(r).error ? (m(), v("div", Vm, o(a(l).label("已保留上一版模型快照，但后台刷新失败：", "The last model snapshot is still on screen, but the background refresh failed: ")) + o(a(r).error), 1)) : ue("", !0),
        X(oe, {
          title: a(l).label("当前路由概览", "Current routing overview"),
          eyebrow: "Routing"
        }, {
          default: le(() => [
            n("div", Gm, [
              n("article", Bm, [
                n("p", Hm, o(a(l).label("主模型", "Primary model")), 1),
                n("strong", null, o(a(r).data.config.primaryModel || a(l).label("待设置", "Not configured")), 1),
                n("span", null, o(a(l).label("默认执行路径", "Default execution route")), 1)
              ]),
              n("article", jm, [
                n("p", Wm, o(a(l).label("Provider 数量", "Providers")), 1),
                n("strong", null, o(a(r).data.config.providers.length), 1),
                n("span", null, o(a(l).label("已经进入运行配置", "Already present in runtime config")), 1)
              ]),
              n("article", Km, [
                n("p", zm, o(a(l).label("备用模型", "Fallbacks")), 1),
                n("strong", null, o(a(r).data.config.fallbackModels.length), 1),
                n("span", null, o(a(l).label("主模型失败时按顺序尝试", "Tried in sequence when the primary route fails")), 1)
              ]),
              n("article", qm, [
                n("p", Jm, o(a(l).label("可选模型", "Available models")), 1),
                n("strong", null, o($.value.length), 1),
                n("span", null, o(a(l).label("来自当前已配置 Provider", "Collected from configured providers")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        X(oe, {
          title: a(l).label("主模型与备用链路", "Primary and fallback chain"),
          eyebrow: "Routing editor"
        }, {
          default: le(() => [
            n("div", Qm, [
              n("label", Ym, [
                n("span", null, o(a(l).label("主模型", "Primary model")), 1),
                n("small", null, o(a(l).label("Guard 默认先走这一条模型路径。", "Guard routes here first by default.")), 1),
                $e(n("select", {
                  "onUpdate:modelValue": y[1] || (y[1] = (C) => f.value = C),
                  class: "settings-input"
                }, [
                  n("option", Zm, o(a(l).label("暂不设置", "Leave unset")), 1),
                  (m(!0), v(Y, null, we($.value, (C) => (m(), v("option", {
                    key: C.fullId,
                    value: C.fullId
                  }, o(`${C.providerName} / ${C.name}`), 9, Xm))), 128))
                ], 512), [
                  [ft, f.value]
                ])
              ])
            ]),
            n("div", eb, [
              (m(!0), v(Y, null, we($.value, (C) => (m(), v("label", {
                key: C.fullId,
                class: "checkbox-card"
              }, [
                n("input", {
                  checked: p.value.includes(C.fullId),
                  type: "checkbox",
                  onChange: (A) => Z(C.fullId)
                }, null, 40, tb),
                n("div", null, [
                  n("strong", null, o(`${C.providerName} / ${C.name}`), 1),
                  n("p", null, o(C.api || a(l).label("未声明 API 类型", "API type is not declared")), 1)
                ])
              ]))), 128))
            ]),
            n("div", sb, [
              n("button", {
                class: "inline-link inline-link--primary",
                type: "button",
                disabled: u.value,
                onClick: F
              }, o(u.value ? a(l).label("保存中…", "Saving…") : a(l).label("保存路由策略", "Save routing strategy")), 9, nb)
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        n("div", lb, [
          X(oe, {
            title: a(l).label("Provider 选择器", "Provider picker"),
            eyebrow: "Provider"
          }, {
            default: le(() => [
              n("div", ab, [
                (m(!0), v(Y, null, we(_.value, (C) => (m(), v("button", {
                  key: C.value,
                  class: _e(["catalog-list__item", { "catalog-list__item--active": c.value === C.value }]),
                  type: "button",
                  onClick: (A) => c.value = C.value
                }, [
                  n("div", ob, [
                    n("strong", null, o(C.label), 1)
                  ]),
                  n("div", rb, [
                    n("span", {
                      class: _e(["pill", C.kind === "custom" ? "pill--success" : C.kind === "preset" ? "pill--info" : "pill--muted"])
                    }, o(C.kind === "custom" ? a(l).label("已配置", "Configured") : C.kind === "preset" ? a(l).label("预设", "Preset") : a(l).label("空白", "Blank")), 3)
                  ])
                ], 10, ib))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          n("div", cb, [
            X(oe, {
              title: h.title,
              eyebrow: "Editor"
            }, {
              default: le(() => [
                n("p", ub, o(L(a(r).data.catalog.presets.find((C) => C.id === c.value), a(r).data.catalog.custom.find((C) => C.name === c.value))), 1),
                n("div", db, [
                  n("label", fb, [
                    n("span", null, o(a(l).label("Provider 名称", "Provider name")), 1),
                    $e(n("input", {
                      "onUpdate:modelValue": y[2] || (y[2] = (C) => h.name = C),
                      class: "settings-input",
                      type: "text"
                    }, null, 512), [
                      [Ne, h.name]
                    ])
                  ]),
                  n("label", pb, [
                    y[8] || (y[8] = n("span", null, "Base URL", -1)),
                    $e(n("input", {
                      "onUpdate:modelValue": y[3] || (y[3] = (C) => h.baseUrl = C),
                      class: "settings-input",
                      type: "text"
                    }, null, 512), [
                      [Ne, h.baseUrl]
                    ])
                  ]),
                  n("label", hb, [
                    n("span", null, o(a(l).label("默认 API 类型", "Default API type")), 1),
                    $e(n("select", {
                      "onUpdate:modelValue": y[4] || (y[4] = (C) => h.apiType = C),
                      class: "settings-input"
                    }, [
                      (m(), v(Y, null, we(t, (C) => n("option", {
                        key: C,
                        value: C
                      }, o(C), 9, gb)), 64))
                    ], 512), [
                      [ft, h.apiType]
                    ])
                  ]),
                  n("label", _b, [
                    y[9] || (y[9] = n("span", null, "API Key", -1)),
                    n("small", null, o(h.apiKeyHelp), 1),
                    $e(n("input", {
                      "onUpdate:modelValue": y[5] || (y[5] = (C) => h.apiKey = C),
                      class: "settings-input",
                      type: "password"
                    }, null, 512), [
                      [Ne, h.apiKey]
                    ])
                  ]),
                  n("label", mb, [
                    n("span", null, o(a(l).label("模型列表", "Model list")), 1),
                    n("small", null, o(a(l).label("每行格式：id | 名称 | contextWindow | maxTokens | api", "One line per model: id | name | contextWindow | maxTokens | api")), 1),
                    $e(n("textarea", {
                      "onUpdate:modelValue": y[6] || (y[6] = (C) => h.modelsText = C),
                      class: "settings-textarea",
                      rows: "8"
                    }, null, 512), [
                      [Ne, h.modelsText]
                    ])
                  ])
                ]),
                n("div", bb, [
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: d.value,
                    onClick: W
                  }, o(d.value ? a(l).label("保存中…", "Saving…") : a(l).label("保存 Provider", "Save provider")), 9, vb),
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: y[7] || (y[7] = (C) => V(c.value))
                  }, o(a(l).label("恢复当前内容", "Reset draft")), 1),
                  h.canDelete ? (m(), v("button", {
                    key: 0,
                    class: "inline-link inline-link--danger",
                    type: "button",
                    disabled: g.value,
                    onClick: N
                  }, o(g.value ? a(l).label("删除中…", "Deleting…") : a(l).label("删除 Provider", "Delete provider")), 9, yb)) : ue("", !0)
                ])
              ]),
              _: 1
            }, 8, ["title"]),
            X(oe, {
              title: a(l).label("已配置 Provider", "Configured providers"),
              eyebrow: "Overview"
            }, {
              default: le(() => [
                n("div", wb, [
                  (m(!0), v(Y, null, we(a(r).data.config.providers, (C) => (m(), v("article", {
                    key: C.name,
                    class: "provider-card"
                  }, [
                    n("header", $b, [
                      n("div", null, [
                        n("strong", null, o(C.name), 1),
                        n("p", null, o(C.baseUrl), 1)
                      ]),
                      n("div", kb, [
                        C.hasApiKey ? (m(), v("span", Sb, o(a(l).label("有密钥", "Has key")), 1)) : (m(), v("span", Cb, o(a(l).label("无密钥", "No key")), 1))
                      ])
                    ]),
                    n("div", xb, [
                      (m(!0), v(Y, null, we(C.models, (A) => (m(), v("div", {
                        key: A.fullId,
                        class: "mini-list__item"
                      }, [
                        n("div", null, [
                          n("strong", null, o(A.name), 1),
                          n("p", null, o(A.fullId), 1)
                        ]),
                        n("div", Rb, [
                          A.isPrimary ? (m(), v("span", Eb, o(a(l).label("主模型", "Primary")), 1)) : ue("", !0),
                          A.isFallback ? (m(), v("span", Tb, o(a(l).label("备用", "Fallback")), 1)) : ue("", !0)
                        ])
                      ]))), 128))
                    ])
                  ]))), 128))
                ])
              ]),
              _: 1
            }, 8, ["title"])
          ])
        ])
      ], 64)) : ue("", !0)
    ]));
  }
});
async function Pb(e = 200, t = 80) {
  const [s, l] = await Promise.all([
    xe(`/api/notifications?limit=${encodeURIComponent(String(e))}`),
    xe(`/api/activity?limit=${encodeURIComponent(String(t))}`)
  ]);
  return {
    summary: {
      items: Array.isArray(s.items) ? s.items : [],
      total: s.total || 0,
      unread: s.unread || 0,
      read: s.read || 0
    },
    events: Array.isArray(l.events) ? l.events : []
  };
}
function Ob(e, t) {
  return De("/api/notifications/read", { id: e, read: t });
}
function Mb(e) {
  return De("/api/notifications/bulk", { action: e });
}
const Ib = { class: "page-stack" }, Nb = { class: "page-header" }, Db = { class: "page-header__eyebrow" }, Lb = { class: "page-header__title" }, Fb = { class: "page-header__description" }, Ub = {
  key: 0,
  class: "page-empty"
}, Vb = {
  key: 1,
  class: "page-empty page-empty--error"
}, Gb = { class: "stat-grid" }, Bb = { class: "stat-card" }, Hb = { class: "stat-card__label" }, jb = { class: "stat-card" }, Wb = { class: "stat-card__label" }, Kb = { class: "stat-card" }, zb = { class: "stat-card__label" }, qb = { class: "stat-card" }, Jb = { class: "stat-card__label" }, Qb = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Yb = { class: "control-grid" }, Zb = { class: "settings-field" }, Xb = ["placeholder"], ev = { class: "settings-field" }, tv = { value: "all" }, sv = ["value"], nv = { class: "settings-field" }, lv = ["value"], av = { class: "pill-row" }, iv = { class: "page-actions" }, ov = ["disabled"], rv = ["disabled"], cv = ["disabled"], uv = ["disabled"], dv = {
  key: 0,
  class: "muted-copy"
}, fv = {
  key: 0,
  class: "timeline-day-stack"
}, pv = { class: "timeline-day-header" }, hv = { class: "provider-stack" }, gv = { class: "provider-card__header" }, _v = { class: "pill-row" }, mv = { class: "pill-row" }, bv = { class: "pill pill--info" }, vv = { class: "pill pill--muted" }, yv = { class: "page-actions" }, wv = ["disabled", "onClick"], $v = ["disabled", "onClick"], kv = {
  key: 1,
  class: "page-empty"
}, Sv = {
  key: 2,
  class: "pagination-bar"
}, Cv = { class: "muted-copy" }, xv = { class: "page-actions" }, Rv = ["disabled"], Ev = ["disabled"], Tv = {
  key: 0,
  class: "provider-stack"
}, Av = { class: "provider-card__header" }, Pv = { class: "pill pill--info" }, Ov = {
  key: 0,
  class: "muted-copy"
}, Mv = {
  key: 1,
  class: "page-empty"
}, Iv = /* @__PURE__ */ Le({
  __name: "NotificationsPage",
  setup(e) {
    let t = null;
    const s = je(), l = it(), i = /* @__PURE__ */ H("reminders"), r = /* @__PURE__ */ H(""), c = /* @__PURE__ */ H("all"), u = /* @__PURE__ */ H("all"), d = /* @__PURE__ */ H(20), g = /* @__PURE__ */ H(1), f = /* @__PURE__ */ H(""), p = /* @__PURE__ */ H(""), h = /* @__PURE__ */ H(""), _ = at(() => Pb(), t, { immediate: !1 }), $ = [10, 20, 50], x = z(() => [
      { id: "reminders", label: s.label("提醒", "Reminders") },
      { id: "timeline", label: s.label("时间线", "Timeline") }
    ]), j = z(() => {
      var K;
      return ((K = _.data) == null ? void 0 : K.summary.items) || [];
    }), V = z(() => {
      var K;
      return ((K = _.data) == null ? void 0 : K.events) || [];
    }), F = z(() => j.value.filter((K) => K.severity === "warning" || K.severity === "error").length), W = z(() => j.value.filter((K) => K.severity === "success").length), N = z(() => Array.from(new Set(j.value.map((K) => K.source).filter(Boolean))).sort()), Z = z(() => {
      const K = r.value.trim().toLowerCase();
      return j.value.filter((q) => u.value === "unread" && q.read || u.value === "warning" && q.severity !== "warning" && q.severity !== "error" || u.value === "success" && q.severity !== "success" || c.value !== "all" && q.source !== c.value ? !1 : K ? [
        q.title,
        q.message,
        q.type,
        q.source,
        JSON.stringify(q.meta || {})
      ].join(" ").toLowerCase().includes(K) : !0);
    }), L = z(() => Math.max(1, Math.ceil(Z.value.length / d.value))), T = z(() => {
      const K = (g.value - 1) * d.value;
      return Z.value.slice(K, K + d.value);
    }), y = z(() => {
      var q;
      const K = /* @__PURE__ */ new Map();
      for (const ae of T.value) {
        const Se = ae.createdAt ? ae.createdAt.slice(0, 10) : "unknown";
        K.has(Se) || K.set(Se, {
          key: Se,
          label: C(ae.createdAt),
          items: []
        }), (q = K.get(Se)) == null || q.items.push(ae);
      }
      return Array.from(K.values());
    });
    Pe(() => _.data, (K) => {
      K && (t = K);
    }), Pe([r, c, u, d, i], () => {
      g.value = 1;
    }), Pe(L, (K) => {
      g.value > K && (g.value = K);
    }), ze(() => {
      _.execute({ silent: !!_.data });
    });
    function C(K) {
      if (!K) return s.label("未知日期", "Unknown date");
      const q = Date.parse(K);
      return Number.isFinite(q) ? new Intl.DateTimeFormat(void 0, {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(new Date(q)) : K;
    }
    function A(K) {
      return K === "success" ? "pill--success" : K === "warning" ? "pill--warning" : K === "error" ? "pill--danger" : "pill--info";
    }
    function ce(K) {
      return K === "success" ? s.label("成功", "Success") : K === "warning" ? s.label("警告", "Warning") : K === "error" ? s.label("异常", "Error") : s.label("提示", "Info");
    }
    function re(K) {
      const ae = {
        cron: { zh: "自动化", en: "Automation" },
        recovery: { zh: "备份与恢复", en: "Backup & Recovery" },
        git: { zh: "Git", en: "Git" },
        "git-sync": { zh: "备份与恢复", en: "Backup & Recovery" },
        openclaw: { zh: "OpenClaw", en: "OpenClaw" },
        security: { zh: "安全", en: "Security" }
      }[K];
      return ae ? s.label(ae.zh, ae.en) : K || s.label("系统提醒", "System reminder");
    }
    function pe(K) {
      const ae = {
        "session-started": { zh: "会话启动", en: "Session started" },
        "session-updated": { zh: "会话更新", en: "Session updated" },
        "session-ended": { zh: "会话结束", en: "Session ended" },
        "runtime-warning": { zh: "运行告警", en: "Runtime warning" },
        "cron-run": { zh: "自动化执行", en: "Automation run" },
        "git-sync": { zh: "备份与恢复", en: "Backup & Recovery" }
      }[K];
      return ae ? s.label(ae.zh, ae.en) : K || s.label("系统事件", "System event");
    }
    function Re(K) {
      return K ? K === "cron-ui" ? s.label("Cron 管理", "Cron management") : K === "openclaw" ? "OpenClaw" : K === "guard-ui" ? "Guard UI" : K : s.label("未知来源", "Unknown source");
    }
    function Ee(K) {
      return [K.agentId, K.modelId, K.status].filter(Boolean).join(" · ");
    }
    function G(K) {
      if (!_.data) return;
      const q = {
        ..._.data,
        summary: {
          items: Array.isArray(K.items) ? K.items : [],
          total: K.total || 0,
          unread: K.unread || 0,
          read: K.read || 0
        }
      };
      _.data = q, t = q;
    }
    async function k() {
      await _.execute({ silent: !!_.data });
    }
    async function P(K) {
      const q = !K.read;
      f.value = K.id;
      try {
        const ae = await Ob(K.id, q);
        G(ae.summary), l.pushToast({
          tone: ae.success ? "success" : "error",
          message: ae.success ? q ? s.label("已标记为已读。", "Marked as read.") : s.label("已重新标记为未读。", "Marked as unread again.") : s.label("更新提醒状态失败。", "Failed to update the reminder state.")
        });
      } catch (ae) {
        l.pushToast({
          tone: "error",
          message: ae instanceof Error ? ae.message : String(ae)
        });
      } finally {
        f.value = "";
      }
    }
    async function be(K) {
      if (!(K === "clear-all" && !await l.confirm({
        title: s.label("清空全部通知", "Clear all reminders"),
        message: s.label("确认清空全部提醒吗？这个操作不可撤销。", "Clear all reminders? This action cannot be undone."),
        confirmLabel: s.label("确认清空", "Clear all"),
        cancelLabel: s.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        p.value = K;
        try {
          const q = await Mb(K);
          G(q.summary), l.pushToast({
            tone: q.success ? "success" : "error",
            message: q.message
          });
        } catch (q) {
          l.pushToast({
            tone: "error",
            message: q instanceof Error ? q.message : String(q)
          });
        } finally {
          p.value = "";
        }
      }
    }
    async function fe(K) {
      var q;
      if (!(typeof navigator > "u" || !((q = navigator.clipboard) != null && q.writeText))) {
        h.value = K.id;
        try {
          await navigator.clipboard.writeText(JSON.stringify(K, null, 2)), l.pushToast({
            tone: "success",
            message: s.label("提醒详情已复制。", "The reminder details have been copied.")
          });
        } finally {
          h.value = "";
        }
      }
    }
    return (K, q) => (m(), v("div", Ib, [
      n("header", Nb, [
        n("div", null, [
          n("p", Db, o(a(s).label("通知 / Fourth slice", "Notifications / Fourth slice")), 1),
          n("h2", Lb, o(a(s).label("提醒与时间线", "Reminders & timeline")), 1),
          n("p", Fb, o(a(s).label("把原来分散的提醒和活动时间线收回同一页里，默认先给普通用户看到可处理的提醒，切换到时间线再回看系统最近发生了什么。", "Bring reminders and the activity feed back into one page, so users first see what needs action and then switch to the timeline to review what the system has been doing.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: k
        }, o(a(_).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      X(Sn, {
        items: x.value,
        "active-id": i.value,
        onChange: q[0] || (q[0] = (ae) => i.value = ae)
      }, null, 8, ["items", "active-id"]),
      a(_).loading && !a(_).data ? (m(), v("div", Ub, o(a(s).label("正在读取提醒与时间线…", "Loading reminders and timeline events…")), 1)) : a(_).error && !a(_).data ? (m(), v("div", Vb, o(a(_).error), 1)) : a(_).data ? (m(), v(Y, { key: 2 }, [
        X(oe, {
          title: a(s).label("当前概览", "Current overview"),
          eyebrow: "Overview"
        }, {
          default: le(() => [
            n("div", Gb, [
              n("article", Bb, [
                n("p", Hb, o(a(s).label("提醒总数", "Total reminders")), 1),
                n("strong", null, o(a(ge)(a(_).data.summary.total)), 1),
                n("span", null, o(a(s).label("包含已读与未读提醒", "Includes both read and unread reminders")), 1)
              ]),
              n("article", jb, [
                n("p", Wb, o(a(s).label("待处理", "Needs attention")), 1),
                n("strong", null, o(a(ge)(a(_).data.summary.unread)), 1),
                n("span", null, o(a(s).label("建议先处理这些未读提醒", "Start with these unread reminders")), 1)
              ]),
              n("article", Kb, [
                n("p", zb, o(a(s).label("告警提醒", "Warnings / errors")), 1),
                n("strong", null, o(a(ge)(F.value)), 1),
                n("span", null, o(a(s).label("包含 warning 与 error 两种严重级别", "Counts both warning and error severity")), 1)
              ]),
              n("article", qb, [
                n("p", Jb, o(a(s).label("时间线事件", "Timeline events")), 1),
                n("strong", null, o(a(ge)(V.value.length)), 1),
                n("span", null, o(a(s).label("最近活动会从这里回放", "Recent system activity is replayed here")), 1)
              ])
            ]),
            a(_).error ? (m(), v("div", Qb, o(a(s).label("已保留上一版成功结果，同时后台刷新失败：", "The last successful result is still on screen, but the background refresh failed: ")) + o(a(_).error), 1)) : ue("", !0)
          ]),
          _: 1
        }, 8, ["title"]),
        i.value === "reminders" ? (m(), v(Y, { key: 0 }, [
          X(oe, {
            title: a(s).label("筛选与批量操作", "Filters & bulk actions"),
            eyebrow: "Controls"
          }, {
            default: le(() => [
              n("div", Yb, [
                n("label", Zb, [
                  n("span", null, o(a(s).label("搜索", "Search")), 1),
                  $e(n("input", {
                    "onUpdate:modelValue": q[1] || (q[1] = (ae) => r.value = ae),
                    class: "settings-input",
                    type: "text",
                    placeholder: a(s).label("搜索标题、消息、来源", "Search title, message, or source")
                  }, null, 8, Xb), [
                    [Ne, r.value]
                  ])
                ]),
                n("label", ev, [
                  n("span", null, o(a(s).label("来源", "Source")), 1),
                  $e(n("select", {
                    "onUpdate:modelValue": q[2] || (q[2] = (ae) => c.value = ae),
                    class: "settings-input"
                  }, [
                    n("option", tv, o(a(s).label("全部来源", "All sources")), 1),
                    (m(!0), v(Y, null, we(N.value, (ae) => (m(), v("option", {
                      key: ae,
                      value: ae
                    }, o(Re(ae)), 9, sv))), 128))
                  ], 512), [
                    [ft, c.value]
                  ])
                ]),
                n("label", nv, [
                  n("span", null, o(a(s).label("每页显示", "Per page")), 1),
                  $e(n("select", {
                    "onUpdate:modelValue": q[3] || (q[3] = (ae) => d.value = ae),
                    class: "settings-input"
                  }, [
                    (m(), v(Y, null, we($, (ae) => n("option", {
                      key: ae,
                      value: ae
                    }, o(a(s).label(`${ae} 条`, `${ae}`)), 9, lv)), 64))
                  ], 512), [
                    [ft, d.value]
                  ])
                ])
              ]),
              n("div", av, [
                n("button", {
                  class: _e(["pill-button", { "pill-button--active": u.value === "all" }]),
                  type: "button",
                  onClick: q[4] || (q[4] = (ae) => u.value = "all")
                }, o(a(s).label(`全部 (${a(_).data.summary.total})`, `All (${a(_).data.summary.total})`)), 3),
                n("button", {
                  class: _e(["pill-button", { "pill-button--active": u.value === "unread" }]),
                  type: "button",
                  onClick: q[5] || (q[5] = (ae) => u.value = "unread")
                }, o(a(s).label(`未读 (${a(_).data.summary.unread})`, `Unread (${a(_).data.summary.unread})`)), 3),
                n("button", {
                  class: _e(["pill-button", { "pill-button--active": u.value === "warning" }]),
                  type: "button",
                  onClick: q[6] || (q[6] = (ae) => u.value = "warning")
                }, o(a(s).label(`警告 (${F.value})`, `Warning (${F.value})`)), 3),
                n("button", {
                  class: _e(["pill-button", { "pill-button--active": u.value === "success" }]),
                  type: "button",
                  onClick: q[7] || (q[7] = (ae) => u.value = "success")
                }, o(a(s).label(`成功 (${W.value})`, `Success (${W.value})`)), 3)
              ]),
              n("div", iv, [
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: p.value === "read-all",
                  onClick: q[8] || (q[8] = (ae) => be("read-all"))
                }, o(p.value === "read-all" ? a(s).label("处理中…", "Working…") : a(s).label("全部标记为已读", "Mark all as read")), 9, ov),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: p.value === "unread-all",
                  onClick: q[9] || (q[9] = (ae) => be("unread-all"))
                }, o(p.value === "unread-all" ? a(s).label("处理中…", "Working…") : a(s).label("全部重新标记为未读", "Mark all as unread")), 9, rv),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: p.value === "clear-read",
                  onClick: q[10] || (q[10] = (ae) => be("clear-read"))
                }, o(p.value === "clear-read" ? a(s).label("处理中…", "Working…") : a(s).label("清空已读提醒", "Clear read reminders")), 9, cv),
                n("button", {
                  class: "inline-link inline-link--danger",
                  type: "button",
                  disabled: p.value === "clear-all",
                  onClick: q[11] || (q[11] = (ae) => be("clear-all"))
                }, o(p.value === "clear-all" ? a(s).label("处理中…", "Working…") : a(s).label("清空全部提醒", "Clear all reminders")), 9, uv)
              ]),
              a(s).developerMode ? ue("", !0) : (m(), v("p", dv, o(a(s).label("原始提醒详情复制已收纳到开发者模式里。若要导出 JSON 详情排障，请先到 Settings 打开开发者模式。", "Raw reminder-detail copy now stays behind developer mode. Enable it from Settings if you need the JSON payload for troubleshooting.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          X(oe, {
            title: a(s).label("提醒列表", "Reminder list"),
            eyebrow: "Reminders"
          }, {
            default: le(() => [
              Z.value.length ? (m(), v("div", fv, [
                (m(!0), v(Y, null, we(y.value, (ae) => (m(), v("section", {
                  key: ae.key,
                  class: "timeline-day-group"
                }, [
                  n("div", pv, [
                    n("strong", null, o(ae.label), 1),
                    n("span", null, o(a(s).label(`${ae.items.length} 条提醒`, `${ae.items.length} reminders`)), 1)
                  ]),
                  n("div", hv, [
                    (m(!0), v(Y, null, we(ae.items, (Se) => (m(), v("article", {
                      key: Se.id,
                      class: "provider-card"
                    }, [
                      n("header", gv, [
                        n("div", null, [
                          n("strong", null, o(Se.title || a(s).label("系统提醒", "System reminder")), 1),
                          n("p", null, o(a(st)(Se.createdAt)), 1)
                        ]),
                        n("div", _v, [
                          n("span", {
                            class: _e(["pill", A(Se.severity)])
                          }, o(ce(Se.severity)), 3),
                          n("span", {
                            class: _e(["pill", Se.read ? "pill--muted" : "pill--warning"])
                          }, o(Se.read ? a(s).label("已读", "Read") : a(s).label("未读", "Unread")), 3)
                        ])
                      ]),
                      n("p", null, o(Se.message), 1),
                      n("div", mv, [
                        n("span", bv, o(Re(Se.source)), 1),
                        n("span", vv, o(re(Se.type)), 1)
                      ]),
                      n("div", yv, [
                        n("button", {
                          class: "inline-link",
                          type: "button",
                          disabled: f.value === Se.id,
                          onClick: (Ge) => P(Se)
                        }, o(f.value === Se.id ? a(s).label("处理中…", "Working…") : Se.read ? a(s).label("重新标记为未读", "Mark as unread") : a(s).label("标记为已读", "Mark as read")), 9, wv),
                        a(s).developerMode ? (m(), v("button", {
                          key: 0,
                          class: "inline-link",
                          type: "button",
                          disabled: h.value === Se.id,
                          onClick: (Ge) => fe(Se)
                        }, o(h.value === Se.id ? a(s).label("复制中…", "Copying…") : a(s).label("复制详情", "Copy details")), 9, $v)) : ue("", !0)
                      ])
                    ]))), 128))
                  ])
                ]))), 128))
              ])) : (m(), v("div", kv, o(a(s).label("当前筛选条件下没有匹配的提醒。", "No reminders match the current filters.")), 1)),
              Z.value.length ? (m(), v("div", Sv, [
                n("p", Cv, o(a(s).label(
                  `当前第 ${g.value} / ${L.value} 页，共 ${Z.value.length} 条提醒`,
                  `Page ${g.value} of ${L.value}, ${Z.value.length} reminders total`
                )), 1),
                n("div", xv, [
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: g.value <= 1,
                    onClick: q[12] || (q[12] = (ae) => g.value -= 1)
                  }, o(a(s).label("上一页", "Previous")), 9, Rv),
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: g.value >= L.value,
                    onClick: q[13] || (q[13] = (ae) => g.value += 1)
                  }, o(a(s).label("下一页", "Next")), 9, Ev)
                ])
              ])) : ue("", !0)
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : (m(), He(oe, {
          key: 1,
          title: a(s).label("最近时间线", "Recent timeline"),
          eyebrow: "Timeline"
        }, {
          default: le(() => [
            V.value.length ? (m(), v("div", Tv, [
              (m(!0), v(Y, null, we(V.value, (ae) => (m(), v("article", {
                key: ae.id,
                class: "provider-card"
              }, [
                n("header", Av, [
                  n("div", null, [
                    n("strong", null, o(ae.title || a(s).label("系统事件", "System event")), 1),
                    n("p", null, o(a(st)(ae.createdAt)), 1)
                  ]),
                  n("span", Pv, o(pe(ae.type)), 1)
                ]),
                n("p", null, o(ae.description), 1),
                Ee(ae) ? (m(), v("p", Ov, o(Ee(ae)), 1)) : ue("", !0)
              ]))), 128))
            ])) : (m(), v("div", Mv, o(a(s).label("时间线里还没有新的记录。", "No timeline events are available yet.")), 1))
          ]),
          _: 1
        }, 8, ["title"]))
      ], 64)) : ue("", !0)
    ]));
  }
}), Nv = { class: "page-stack" }, Dv = { class: "page-header" }, Lv = { class: "page-header__eyebrow" }, Fv = { class: "page-header__title" }, Uv = { class: "page-header__description" }, Vv = {
  key: 0,
  class: "page-empty"
}, Gv = {
  key: 1,
  class: "page-empty page-empty--error"
}, Bv = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Hv = { class: "stat-grid" }, jv = { class: "stat-card" }, Wv = { class: "stat-card__label" }, Kv = { class: "stat-card" }, zv = { class: "stat-card__label" }, qv = { class: "stat-card" }, Jv = { class: "stat-card__label" }, Qv = { class: "stat-card" }, Yv = { class: "stat-card__label" }, Zv = { class: "muted-copy" }, Xv = { class: "code-panel" }, ey = { class: "code-panel" }, ty = { class: "muted-copy" }, sy = /* @__PURE__ */ Le({
  __name: "OpenClawPage",
  setup(e) {
    let t = null;
    const s = je(), l = at(() => lg(), t, { immediate: !1 }), i = z(() => {
      var _;
      return (_ = l.data) != null && _.status && typeof l.data.status == "object" ? l.data.status : {};
    }), r = z(() => {
      var _;
      return (_ = l.data) != null && _.targets && typeof l.data.targets == "object" ? l.data.targets : {};
    }), c = z(() => i.value.installed ? String(i.value.version || s.label("已安装", "Installed")) : s.label("未安装", "Not installed")), u = z(() => String(i.value.detectedSource || s.label("待检测", "Pending detection"))), d = z(() => String(i.value.effectiveUpdater || i.value.installKind || "-")), g = z(() => String(i.value.updateChannel || "-")), f = z(() => String(i.value.latestVersion || "-")), p = z(() => i.value.installed ? i.value.updateAvailable ? s.label("当前检测到可更新版本，后续会在这里接上推荐更新与快速回退。", "An update is available. This page will next gain recommended update and quick rollback actions.") : s.label("当前版本看起来已稳定，可继续检查渠道、模型或备份与恢复设置。", "The current version looks stable. You can continue with channels, models, or backup and recovery setup.") : s.label("先完成安装或修复，再进入版本管理。", "Install or repair OpenClaw first before managing versions."));
    function h(_) {
      return JSON.stringify(_, null, 2);
    }
    return Pe(() => l.data, (_) => {
      _ && (t = _);
    }), ze(() => {
      l.execute({ silent: !!l.data });
    }), (_, $) => (m(), v("div", Nv, [
      n("header", Dv, [
        n("div", null, [
          n("p", Lv, o(a(s).label("OpenClaw", "OpenClaw")), 1),
          n("h2", Fv, o(a(s).label("OpenClaw 生命周期面板", "OpenClaw lifecycle panel")), 1),
          n("p", Uv, o(a(s).label("先给出当前安装、更新方式和推荐下一步；只有在开发者模式下才显示原始状态。", "Start with the current install state, update strategy, and the best next step. Raw state stays behind developer mode.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: $[0] || ($[0] = (x) => a(l).execute({ silent: !0 }))
        }, o(a(l).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      a(l).loading && !a(l).data ? (m(), v("div", Vv, o(a(s).label("正在加载 OpenClaw 状态…", "Loading the OpenClaw status…")), 1)) : a(l).error && !a(l).data ? (m(), v("div", Gv, o(a(l).error), 1)) : a(l).data ? (m(), v(Y, { key: 2 }, [
        a(l).error ? (m(), v("div", Bv, o(a(s).label("已保留上一版 OpenClaw 快照，但后台刷新失败：", "The last OpenClaw snapshot is still on screen, but the background refresh failed: ")) + o(a(l).error), 1)) : ue("", !0),
        X(oe, {
          title: a(s).label("当前状态", "Current status"),
          eyebrow: "Status"
        }, {
          default: le(() => [
            n("div", Hv, [
              n("article", jv, [
                n("p", Wv, o(a(s).label("安装状态", "Install state")), 1),
                n("strong", null, o(c.value), 1),
                n("span", null, o(u.value), 1)
              ]),
              n("article", Kv, [
                n("p", zv, o(a(s).label("更新方式", "Update strategy")), 1),
                n("strong", null, o(d.value), 1),
                n("span", null, o(a(s).label("来源与更新引擎由当前探测结果决定。", "The source and updater come from the current detection result.")), 1)
              ]),
              n("article", qv, [
                n("p", Jv, o(a(s).label("渠道", "Channel")), 1),
                n("strong", null, o(g.value), 1),
                n("span", null, o(a(s).label("当前可见的推荐更新渠道。", "The currently visible recommended update channel.")), 1)
              ]),
              n("article", Qv, [
                n("p", Yv, o(a(s).label("最新版本", "Latest version")), 1),
                n("strong", null, o(f.value), 1),
                n("span", null, o(a(s).label("当远端能检测到版本信息时会显示在这里。", "When the remote version can be resolved, it appears here.")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        X(oe, {
          title: a(s).label("建议下一步", "Suggested next step"),
          eyebrow: "Next"
        }, {
          default: le(() => [
            n("div", {
              class: _e(["status-banner", { "status-banner--warning": i.value.updateAvailable === !0 }])
            }, [
              n("div", null, [
                n("strong", null, o(a(s).label("推荐动作", "Recommended action")), 1),
                n("p", Zv, o(p.value), 1)
              ])
            ], 2)
          ]),
          _: 1
        }, 8, ["title"]),
        a(s).developerMode ? (m(), He(oe, {
          key: 1,
          title: a(s).label("原始状态快照", "Raw status snapshot"),
          eyebrow: "Developer"
        }, {
          default: le(() => [
            n("pre", Xv, o(h(i.value)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : ue("", !0),
        a(s).developerMode ? (m(), He(oe, {
          key: 2,
          title: a(s).label("原始目标目录", "Raw targets catalog"),
          eyebrow: "Developer"
        }, {
          default: le(() => [
            n("pre", ey, o(h(r.value)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : (m(), He(oe, {
          key: 3,
          title: a(s).label("开发者模式", "Developer mode"),
          eyebrow: "Developer"
        }, {
          default: le(() => [
            n("p", ty, o(a(s).label("如果需要查看 OpenClaw 的原始 JSON、目标目录和诊断区，请先到 Settings 里开启开发者模式。", "If you need the raw OpenClaw JSON, target catalog, and diagnostic views, enable developer mode from Settings first.")), 1)
          ]),
          _: 1
        }, 8, ["title"]))
      ], 64)) : ue("", !0)
    ]));
  }
}), ny = { class: "page-stack" }, ly = { class: "page-header" }, ay = { class: "page-header__eyebrow" }, iy = { class: "page-header__title" }, oy = { class: "page-header__description" }, ry = {
  key: 0,
  class: "page-empty"
}, cy = {
  key: 1,
  class: "page-empty page-empty--error"
}, uy = {
  key: 0,
  class: "status-banner status-banner--warning"
}, dy = { class: "stat-grid" }, fy = { class: "stat-card" }, py = { class: "stat-card__label" }, hy = { class: "stat-card" }, gy = { class: "stat-card__label" }, _y = { class: "stat-card" }, my = { class: "stat-card__label" }, by = { class: "stat-card" }, vy = { class: "stat-card__label" }, yy = { class: "muted-copy" }, wy = { class: "code-panel" }, $y = { class: "code-panel" }, ky = { class: "muted-copy" }, Sy = /* @__PURE__ */ Le({
  __name: "OperationsPage",
  setup(e) {
    let t = null;
    const s = je(), l = at(() => ng(), t, { immediate: !1 }), i = z(() => {
      var _;
      return (_ = l.data) != null && _.webReport && typeof l.data.webReport == "object" ? l.data.webReport : {};
    }), r = z(() => {
      var _;
      return (_ = l.data) != null && _.services && typeof l.data.services == "object" ? l.data.services : {};
    }), c = z(() => Object.entries(r.value)), u = z(() => i.value.running === !0 ? s.label("运行中", "Running") : s.label("未运行", "Stopped")), d = z(() => String(i.value.primaryUrl || "-")), g = z(() => String(i.value.workbenchUrl || "-")), f = z(() => String(i.value.nextAction || "-")), p = z(() => {
      const _ = i.value.pid, $ = i.value.port;
      return !_ && !$ ? "-" : _ && $ ? `PID ${_} · ${s.label("端口", "Port")} ${$}` : _ ? `PID ${_}` : `${s.label("端口", "Port")} ${$}`;
    });
    function h(_) {
      return JSON.stringify(_, null, 2);
    }
    return Pe(() => l.data, (_) => {
      _ && (t = _);
    }), ze(() => {
      l.execute({ silent: !!l.data });
    }), (_, $) => (m(), v("div", ny, [
      n("header", ly, [
        n("div", null, [
          n("p", ay, o(a(s).label("运维 / First slice", "Operations / First slice")), 1),
          n("h2", iy, o(a(s).label("运行态与后台服务", "Runtime and background services")), 1),
          n("p", oy, o(a(s).label("先把运行状态、访问地址和后台托管信息迁进新壳层，原始快照只在开发者模式下显示。", "Bring runtime status, access URLs, and managed background details into the new shell first. Raw snapshots stay behind developer mode.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: $[0] || ($[0] = (x) => a(l).execute({ silent: !0 }))
        }, o(a(l).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      a(l).loading && !a(l).data ? (m(), v("div", ry, o(a(s).label("正在加载运维状态…", "Loading operations status…")), 1)) : a(l).error && !a(l).data ? (m(), v("div", cy, o(a(l).error), 1)) : a(l).data ? (m(), v(Y, { key: 2 }, [
        a(l).error ? (m(), v("div", uy, o(a(s).label("已保留上一版运维快照，但后台刷新失败：", "The last operations snapshot is still on screen, but the background refresh failed: ")) + o(a(l).error), 1)) : ue("", !0),
        X(oe, {
          title: a(s).label("运行摘要", "Runtime summary"),
          eyebrow: "Summary"
        }, {
          default: le(() => [
            n("div", dy, [
              n("article", fy, [
                n("p", py, o(a(s).label("Guard Web", "Guard Web")), 1),
                n("strong", null, o(u.value), 1),
                n("span", null, o(String(i.value.source || "-")), 1)
              ]),
              n("article", hy, [
                n("p", gy, o(a(s).label("访问地址", "Access URL")), 1),
                n("strong", null, o(d.value), 1),
                n("span", null, o(g.value), 1)
              ]),
              n("article", _y, [
                n("p", my, o(a(s).label("后台进程", "Background process")), 1),
                n("strong", null, o(p.value), 1),
                n("span", null, o(i.value.managed === !0 ? a(s).label("当前由 Guard 托管", "Currently managed by Guard") : a(s).label("当前不是 Guard 托管进程", "This process is not managed by Guard")), 1)
              ]),
              n("article", by, [
                n("p", vy, o(a(s).label("服务快照", "Service snapshot")), 1),
                n("strong", null, o(c.value.length), 1),
                n("span", null, o(a(s).label("当前接口返回的服务条目数", "Number of service entries returned by the current API")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        X(oe, {
          title: a(s).label("建议下一步", "Suggested next step"),
          eyebrow: "Guide"
        }, {
          default: le(() => [
            n("div", {
              class: _e(["status-banner", { "status-banner--warning": i.value.running !== !0 }])
            }, [
              n("div", null, [
                n("strong", null, o(a(s).label("下一步", "Next step")), 1),
                n("p", yy, o(f.value), 1)
              ])
            ], 2)
          ]),
          _: 1
        }, 8, ["title"]),
        a(s).developerMode ? (m(), He(oe, {
          key: 1,
          title: a(s).label("后台 Web 报告", "Background web report"),
          eyebrow: "Developer"
        }, {
          default: le(() => [
            n("pre", wy, o(h(a(l).data.webReport)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : ue("", !0),
        a(s).developerMode ? (m(), He(oe, {
          key: 2,
          title: a(s).label("服务状态原始快照", "Service status snapshot"),
          eyebrow: "Developer"
        }, {
          default: le(() => [
            n("pre", $y, o(h(a(l).data.services)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : (m(), He(oe, {
          key: 3,
          title: a(s).label("开发者模式", "Developer mode"),
          eyebrow: "Developer"
        }, {
          default: le(() => [
            n("p", ky, o(a(s).label("如果你需要查看原始 Web 报告、服务快照或后续的刷新诊断，请先到 Settings 打开开发者模式。", "If you need raw web reports, service snapshots, or future refresh diagnostics, enable developer mode from Settings first.")), 1)
          ]),
          _: 1
        }, 8, ["title"]))
      ], 64)) : ue("", !0)
    ]));
  }
});
async function Cy() {
  const [e, t, s, l] = await Promise.all([
    xe("/api/recovery/overview"),
    xe("/api/recovery/points?limit=20"),
    xe("/api/git-sync/status"),
    xe("/api/git-sync/gitignore-preview?mode=smart")
  ]);
  return {
    overview: e,
    points: t.items || [],
    gitStatus: s,
    gitIgnorePreview: l
  };
}
function xy(e) {
  return De("/api/recovery/save", { label: e || "" });
}
function Ry(e) {
  return De("/api/recovery/restore", { commitSha: e });
}
function Ey() {
  return De("/api/git-sync/init", {});
}
function Ty() {
  return De("/api/git-sync/check-private", {});
}
function Ay(e) {
  return De("/api/git-sync/commit", { message: "" });
}
function Py() {
  return De("/api/git-sync/push", {});
}
function Oy(e) {
  return De("/api/git-sync/sync", { message: "" });
}
function My(e = "smart") {
  return De("/api/git-sync/gitignore-apply", { mode: e });
}
const Iy = { class: "page-stack" }, Ny = { class: "page-header" }, Dy = { class: "page-header__eyebrow" }, Ly = { class: "page-header__title" }, Fy = { class: "page-header__description" }, Uy = {
  key: 0,
  class: "page-empty"
}, Vy = {
  key: 1,
  class: "page-empty page-empty--error"
}, Gy = {
  key: 0,
  class: "status-banner status-banner--warning"
}, By = { class: "provider-card__header" }, Hy = { class: "muted-copy" }, jy = { class: "stat-grid" }, Wy = { class: "stat-card" }, Ky = { class: "stat-card__label" }, zy = { class: "stat-card" }, qy = { class: "stat-card__label" }, Jy = { class: "stat-card" }, Qy = { class: "stat-card__label" }, Yy = { class: "stat-card" }, Zy = { class: "stat-card__label" }, Xy = { class: "list-stack" }, e1 = { class: "action-row" }, t1 = { class: "pill pill--info" }, s1 = { class: "action-row" }, n1 = { class: "pill pill--success" }, l1 = { class: "settings-grid settings-grid--wide" }, a1 = { class: "settings-field settings-field--full" }, i1 = { class: "page-actions" }, o1 = ["disabled"], r1 = {
  key: 0,
  class: "provider-stack"
}, c1 = { class: "provider-card__header" }, u1 = { class: "pill-row" }, d1 = { class: "pill pill--info" }, f1 = {
  key: 0,
  class: "muted-copy"
}, p1 = { class: "page-actions" }, h1 = ["onClick"], g1 = ["disabled", "onClick"], _1 = {
  key: 1,
  class: "page-empty"
}, m1 = { class: "muted-copy" }, b1 = { class: "page-actions" }, v1 = {
  class: "inline-link",
  href: "/#recovery",
  target: "_blank",
  rel: "noreferrer"
}, y1 = { class: "stat-grid" }, w1 = { class: "stat-card" }, $1 = { class: "stat-card__label" }, k1 = { class: "stat-card" }, S1 = { class: "stat-card__label" }, C1 = { class: "stat-card" }, x1 = { class: "stat-card__label" }, R1 = { class: "stat-card" }, E1 = { class: "stat-card__label" }, T1 = { class: "page-actions" }, A1 = ["disabled"], P1 = ["disabled"], O1 = ["disabled"], M1 = ["disabled"], I1 = ["disabled"], N1 = {
  key: 0,
  class: "muted-copy"
}, D1 = { class: "list-stack" }, L1 = { class: "action-row" }, F1 = { class: "action-row" }, U1 = { class: "action-row" }, V1 = {
  key: 0,
  class: "code-panel"
}, G1 = {
  key: 1,
  class: "muted-copy"
}, B1 = { class: "muted-copy" }, H1 = { class: "stat-grid" }, j1 = { class: "stat-card" }, W1 = { class: "stat-card__label" }, K1 = { class: "stat-card" }, z1 = { class: "stat-card__label" }, q1 = {
  key: 0,
  class: "code-panel"
}, J1 = {
  key: 1,
  class: "muted-copy"
}, Q1 = { class: "page-actions" }, Y1 = ["disabled"], Z1 = /* @__PURE__ */ Le({
  __name: "RecoveryPage",
  setup(e) {
    let t = null;
    const s = je(), l = it(), i = /* @__PURE__ */ H("center"), r = /* @__PURE__ */ H(""), c = /* @__PURE__ */ H(""), u = /* @__PURE__ */ H(!1), d = /* @__PURE__ */ H(""), g = /* @__PURE__ */ H(""), f = at(() => Cy(), t, { immediate: !1 }), p = z(() => [
      { id: "center", label: s.label("恢复中心", "Recovery center") },
      { id: "advanced", label: s.label("高级 Git", "Advanced Git") }
    ]), h = z(() => {
      var T;
      const L = (T = f.data) == null ? void 0 : T.overview;
      return L ? !L.repoReady || L.warnings.length > 0 ? "pill--warning" : L.remoteReady ? "pill--success" : "pill--info" : "pill--muted";
    });
    function _() {
      var T;
      const L = (T = f.data) == null ? void 0 : T.overview;
      return L ? L.protected ? L.remoteReady ? s.label("已上云保护", "Cloud protection ready") : s.label("当前仅本机可恢复", "Local recovery only") : s.label("尚未建立保护", "Protection not set up") : s.label("读取中", "Loading");
    }
    function $(L) {
      const y = {
        "install-git": { zh: "先安装 Git", en: "Install Git first" },
        "setup-protection": { zh: "先完成保护设置", en: "Complete protection setup first" },
        "save-first-point": { zh: "创建首个恢复点", en: "Create the first recovery point" },
        "save-current-state": { zh: "先保存当前状态", en: "Save the current state first" },
        "review-restored-state": { zh: "检查刚恢复的状态", en: "Review the restored state" },
        "connect-private-remote": { zh: "连接私有仓库", en: "Connect a private remote" },
        "sync-latest-point": { zh: "把最新保护点同步到云端", en: "Sync the latest point to the cloud" },
        protected: { zh: "当前已经受保护", en: "Protection is already in place" }
      }[L || ""];
      return y ? s.label(y.zh, y.en) : L || "-";
    }
    function x(L) {
      return L.kind === "auto" ? s.label("自动保护", "Auto protection") : L.kind === "restore" ? s.label("已恢复到此状态", "Restore point") : s.label("手动保存", "Manual save");
    }
    async function j() {
      await f.execute({ silent: !!f.data });
    }
    async function V() {
      u.value = !0;
      try {
        const L = await xy(r.value.trim() || void 0);
        l.pushToast({
          tone: L.success ? "success" : "error",
          message: L.message
        }), L.success && (r.value = "", await j());
      } catch (L) {
        l.pushToast({
          tone: "error",
          message: L instanceof Error ? L.message : String(L)
        });
      } finally {
        u.value = !1;
      }
    }
    async function F(L) {
      if (await l.confirm({
        title: s.label("恢复到这个状态", "Restore this state"),
        message: s.label(
          `确认回到 ${L.title} 吗？Guard 会先保护当前未提交内容，再在同一主线上追加一个 restore commit，不会删除历史。`,
          `Restore ${L.title}? Guard will first protect any uncommitted changes and then add a restore commit on the same main line without deleting history.`
        ),
        confirmLabel: s.label("确认恢复", "Restore now"),
        cancelLabel: s.label("取消", "Cancel"),
        tone: "danger"
      })) {
        d.value = L.commitSha;
        try {
          const y = await Ry(L.commitSha);
          l.pushToast({
            tone: y.success ? "success" : "error",
            message: y.message
          }), await j();
        } catch (y) {
          l.pushToast({
            tone: "error",
            message: y instanceof Error ? y.message : String(y)
          });
        } finally {
          d.value = "";
        }
      }
    }
    async function W(L) {
      g.value = L, c.value = "";
      try {
        const T = L === "init" ? await Ey() : L === "private" ? await Ty() : L === "checkpoint" ? await Ay() : L === "push" ? await Py() : L === "sync" ? await Oy() : await My("smart");
        c.value = T.message, l.pushToast({
          tone: T.success ? "success" : "error",
          message: T.message
        }), await j();
      } catch (T) {
        const y = T instanceof Error ? T.message : String(T);
        c.value = y, l.pushToast({
          tone: "error",
          message: y
        });
      } finally {
        g.value = "";
      }
    }
    function N(L) {
      i.value = L;
    }
    async function Z(L) {
      var T;
      typeof navigator > "u" || !((T = navigator.clipboard) != null && T.writeText) || (await navigator.clipboard.writeText(L), l.pushToast({
        tone: "success",
        message: s.label("恢复点哈希已复制。", "Recovery point hash copied.")
      }));
    }
    return Pe(() => f.data, (L) => {
      L && (t = L);
    }), ze(() => {
      f.execute({ silent: !!f.data });
    }), (L, T) => (m(), v("div", Iy, [
      n("header", Ny, [
        n("div", null, [
          n("p", Dy, o(a(s).label("备份与恢复 / Second slice", "Backup & Recovery / Second slice")), 1),
          n("h2", Ly, o(a(s).label("备份与恢复", "Backup & Recovery")), 1),
          n("p", Fy, o(a(s).label("默认先讲“保存现在、回到某个状态、然后继续往前走”，把 Git 细节下沉到高级视图。", "Start with save now, go back to a protected state, then keep moving forward, while pushing raw Git details into the advanced view.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: j
        }, o(a(f).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      X(Sn, {
        items: p.value,
        "active-id": i.value,
        onChange: N
      }, null, 8, ["items", "active-id"]),
      a(f).loading && !a(f).data ? (m(), v("div", Uy, o(a(s).label("正在读取保护状态…", "Loading protection status…")), 1)) : a(f).error && !a(f).data ? (m(), v("div", Vy, o(a(f).error), 1)) : a(f).data ? (m(), v(Y, { key: 2 }, [
        a(f).error ? (m(), v("div", Gy, o(a(s).label("已保留上一版备份与恢复快照，但后台刷新失败：", "The last backup and recovery snapshot is still on screen, but the background refresh failed: ")) + o(a(f).error), 1)) : ue("", !0),
        i.value === "center" ? (m(), v(Y, { key: 1 }, [
          X(oe, {
            title: a(s).label("当前保护状态", "Current protection state"),
            eyebrow: "Overview"
          }, {
            default: le(() => {
              var y;
              return [
                n("div", By, [
                  n("p", Hy, o(a(s).label("先看这里就能知道现在是否已经受保护、是否已经上云，以及下一步最建议做什么。", "Start here to see whether protection is already in place, whether it has reached the cloud, and what the next recommended action is.")), 1),
                  n("span", {
                    class: _e(["pill", h.value])
                  }, o(_()), 3)
                ]),
                n("div", jy, [
                  n("article", Wy, [
                    n("p", Ky, o(a(s).label("当前主线", "Current branch")), 1),
                    n("strong", null, o(a(f).data.overview.currentBranch || "-"), 1),
                    n("span", null, o(a(s).label("恢复后仍会继续写在这条主线上", "Future saves continue on the same main line after a restore")), 1)
                  ]),
                  n("article", zy, [
                    n("p", qy, o(a(s).label("最近保存", "Last saved")), 1),
                    n("strong", null, o(a(st)(a(f).data.overview.lastSavedAt)), 1),
                    n("span", null, o(((y = a(f).data.overview.latestPoint) == null ? void 0 : y.title) || a(s).label("还没有恢复点", "No recovery point yet")), 1)
                  ]),
                  n("article", Jy, [
                    n("p", Qy, o(a(s).label("最近上云", "Last pushed")), 1),
                    n("strong", null, o(a(st)(a(f).data.overview.lastPushedAt)), 1),
                    n("span", null, o(a(f).data.overview.remoteReady ? a(s).label("云端保护已就绪", "Cloud protection is ready") : a(s).label("当前还没完成云端接线", "Cloud protection is not ready yet")), 1)
                  ]),
                  n("article", Yy, [
                    n("p", Zy, o(a(s).label("下一步建议", "Recommended next step")), 1),
                    n("strong", null, o($(a(f).data.overview.nextAction)), 1),
                    n("span", null, o(a(f).data.overview.unsyncedChanges ? a(s).label("当前存在未同步变化", "There are unsynced changes right now") : a(s).label("当前没有额外待处理变化", "No extra pending changes right now")), 1)
                  ])
                ])
              ];
            }),
            _: 1
          }, 8, ["title"]),
          X(oe, {
            title: a(s).label("下一步建议", "Recommended next actions"),
            eyebrow: "Guide"
          }, {
            default: le(() => [
              n("div", Xy, [
                n("article", e1, [
                  n("div", null, [
                    n("h3", null, o(a(s).label("先保住现在", "Protect the current state")), 1),
                    n("p", null, o(a(s).label("当你刚完成一轮配置、修复或工作区整理时，就立刻保存一个恢复点。", "Whenever you finish a round of setup, fixes, or workspace cleanup, save a recovery point right away.")), 1)
                  ]),
                  n("span", t1, o($(a(f).data.overview.nextAction)), 1)
                ]),
                n("article", s1, [
                  n("div", null, [
                    n("h3", null, o(a(s).label("回退不会删历史", "Restoring does not delete history")), 1),
                    n("p", null, o(a(s).label("Guard 会在当前主线上追加一个 restore commit，后面的版本会继续接在它后面。", "Guard adds a restore commit on the current main line, and future versions continue after that point.")), 1)
                  ]),
                  n("span", n1, o(a(s).label("同一主线继续", "Continue on the same main line")), 1)
                ]),
                (m(!0), v(Y, null, we(a(f).data.overview.warnings, (y) => (m(), v("article", {
                  key: y,
                  class: "risk-row"
                }, [
                  n("strong", null, o(a(s).label("注意事项", "Warning")), 1),
                  n("span", null, o(y), 1)
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(oe, {
            title: a(s).label("立即保存", "Save now"),
            eyebrow: "Checkpoint"
          }, {
            default: le(() => [
              n("div", l1, [
                n("label", a1, [
                  n("span", null, o(a(s).label("恢复点说明（可选）", "Recovery point label (optional)")), 1),
                  n("small", null, o(a(s).label("不写也可以，Guard 会自动生成一个带时间的恢复点标题。", "This is optional. Guard can generate a timestamped title automatically.")), 1),
                  $e(n("input", {
                    "onUpdate:modelValue": T[0] || (T[0] = (y) => r.value = y),
                    class: "settings-input",
                    type: "text"
                  }, null, 512), [
                    [Ne, r.value]
                  ])
                ])
              ]),
              n("div", i1, [
                n("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  disabled: u.value,
                  onClick: V
                }, o(u.value ? a(s).label("保存中…", "Saving…") : a(s).label("保存当前状态", "Save current state")), 9, o1)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(oe, {
            title: a(s).label("恢复点时间线", "Recovery point timeline"),
            eyebrow: "Timeline"
          }, {
            default: le(() => [
              a(f).data.points.length ? (m(), v("div", r1, [
                (m(!0), v(Y, null, we(a(f).data.points, (y) => (m(), v("article", {
                  key: y.id,
                  class: "provider-card"
                }, [
                  n("header", c1, [
                    n("div", null, [
                      n("strong", null, o(y.title), 1),
                      n("p", null, o(a(st)(y.createdAt)) + " · " + o(a(Na)(y.commitSha)), 1)
                    ]),
                    n("div", u1, [
                      n("span", d1, o(x(y)), 1),
                      n("span", {
                        class: _e(["pill", y.pushed ? "pill--success" : "pill--warning"])
                      }, o(y.pushed ? a(s).label("已上云", "Synced") : a(s).label("仅本机", "Local only")), 3)
                    ])
                  ]),
                  n("p", null, o(y.summary), 1),
                  y.sourceCommitSha ? (m(), v("p", f1, o(a(s).label("来源节点：", "Source commit: ")) + o(a(Na)(y.sourceCommitSha)), 1)) : ue("", !0),
                  n("div", p1, [
                    n("button", {
                      class: "inline-link",
                      type: "button",
                      onClick: (C) => Z(y.commitSha)
                    }, o(a(s).label("复制节点", "Copy point")), 9, h1),
                    n("button", {
                      class: "inline-link inline-link--primary",
                      type: "button",
                      disabled: !y.restorable || d.value === y.commitSha,
                      onClick: (C) => F(y)
                    }, o(d.value === y.commitSha ? a(s).label("恢复中…", "Restoring…") : a(s).label("回到这个状态", "Restore this state")), 9, g1)
                  ])
                ]))), 128))
              ])) : (m(), v("div", _1, o(a(s).label("当前还没有恢复点。建议先完成一次手动保存。", "No recovery points exist yet. Create a manual save first.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : (m(), v(Y, { key: 2 }, [
          X(oe, {
            title: a(s).label("高级 Git 入口", "Advanced Git entry"),
            eyebrow: "Advanced"
          }, {
            default: le(() => [
              n("p", m1, o(a(s).label("这里先接入最常用的高级动作和状态读取；更复杂的远端绑定、OAuth 和专家级操作，当前阶段仍保留在正式控制台。", "This view already brings in the most common advanced actions and status reads. More complex remote binding, OAuth, and expert-level operations still stay in the production console for now.")), 1),
              n("div", b1, [
                n("a", v1, o(a(s).label("打开正式控制台中的高级 Git", "Open advanced Git in the production console")), 1)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(oe, {
            title: a(s).label("当前仓库状态", "Current repository status"),
            eyebrow: "Status"
          }, {
            default: le(() => [
              n("div", y1, [
                n("article", w1, [
                  n("p", $1, o(a(s).label("仓库初始化", "Repository")), 1),
                  n("strong", null, o(a(f).data.gitStatus.repoInitialized ? a(s).label("已初始化", "Initialized") : a(s).label("未初始化", "Not initialized")), 1),
                  n("span", null, o(a(f).data.gitStatus.repoPath), 1)
                ]),
                n("article", k1, [
                  n("p", S1, o(a(s).label("远端仓库", "Remote")), 1),
                  n("strong", null, o(a(f).data.gitStatus.remoteName || "-"), 1),
                  n("span", null, o(a(f).data.gitStatus.remoteUrl || a(s).label("还没绑定远端", "No remote connected yet")), 1)
                ]),
                n("article", C1, [
                  n("p", x1, o(a(s).label("认证方式", "Auth mode")), 1),
                  n("strong", null, o(a(f).data.gitStatus.authMode || "-"), 1),
                  n("span", null, o(a(f).data.gitStatus.authConfigured ? a(s).label("当前已配置认证", "Authentication is configured") : a(s).label("当前还没配置认证", "Authentication is not configured yet")), 1)
                ]),
                n("article", R1, [
                  n("p", E1, o(a(s).label("私有检查", "Private check")), 1),
                  n("strong", null, o(a(f).data.gitStatus.repoPrivate === !0 ? a(s).label("已通过", "Passed") : a(f).data.gitStatus.repoPrivate === !1 ? a(s).label("未通过", "Failed") : a(s).label("未检查", "Pending")), 1),
                  n("span", null, o(a(f).data.gitStatus.state.lastSyncAt ? `${a(s).label("最近同步", "Last sync")} ${a(st)(a(f).data.gitStatus.state.lastSyncAt)}` : a(s).label("还没有成功同步记录", "No successful sync record yet")), 1)
                ])
              ]),
              n("div", T1, [
                n("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  disabled: g.value === "init",
                  onClick: T[1] || (T[1] = (y) => W("init"))
                }, o(g.value === "init" ? a(s).label("初始化中…", "Initializing…") : a(s).label("初始化保护仓库", "Initialize protection repo")), 9, A1),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: g.value === "private",
                  onClick: T[2] || (T[2] = (y) => W("private"))
                }, o(g.value === "private" ? a(s).label("检查中…", "Checking…") : a(s).label("检查私有仓库", "Check private remote")), 9, P1),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: g.value === "checkpoint",
                  onClick: T[3] || (T[3] = (y) => W("checkpoint"))
                }, o(g.value === "checkpoint" ? a(s).label("提交中…", "Committing…") : a(s).label("创建本地 checkpoint", "Create local checkpoint")), 9, O1),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: g.value === "push",
                  onClick: T[4] || (T[4] = (y) => W("push"))
                }, o(g.value === "push" ? a(s).label("推送中…", "Pushing…") : a(s).label("推送到云端", "Push to cloud")), 9, M1),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: g.value === "sync",
                  onClick: T[5] || (T[5] = (y) => W("sync"))
                }, o(g.value === "sync" ? a(s).label("同步中…", "Syncing…") : a(s).label("提交并同步", "Commit and sync")), 9, I1)
              ]),
              c.value ? (m(), v("p", N1, o(c.value), 1)) : ue("", !0)
            ]),
            _: 1
          }, 8, ["title"]),
          X(oe, {
            title: a(s).label("保护范围摘要", "Protection scope summary"),
            eyebrow: "Scope"
          }, {
            default: le(() => [
              n("div", D1, [
                n("article", L1, [
                  n("div", null, [
                    n("h3", null, o(a(s).label("当前工作树变化", "Current worktree changes")), 1),
                    n("p", null, o(a(s).label("这些文件会进入根保护线；嵌套仓库会被单独标记，不会被误提交到根线。", "These files enter the root protection line, while nested repositories are marked separately so they are not committed into the root line by mistake.")), 1)
                  ]),
                  n("strong", null, o(a(f).data.gitStatus.changedFiles.length), 1)
                ]),
                n("article", F1, [
                  n("div", null, [
                    n("h3", null, o(a(s).label("可直接纳入保护", "Stageable in root line")), 1),
                    n("p", null, o(a(s).label("这些改动可以直接由 Guard 提交为恢复点。", "These changes can be committed directly by Guard as recovery points.")), 1)
                  ]),
                  n("strong", null, o(a(f).data.gitStatus.stageableChangedFiles.length), 1)
                ]),
                n("article", U1, [
                  n("div", null, [
                    n("h3", null, o(a(s).label("嵌套仓库", "Nested repositories")), 1),
                    n("p", null, o(a(s).label("这些目录更适合单独维护，Guard 不会在根保护线里直接接管。", "These directories are better maintained separately. Guard does not take them over inside the root protection line.")), 1)
                  ]),
                  n("strong", null, o(a(f).data.gitStatus.skippedEmbeddedRepos.length), 1)
                ])
              ]),
              a(s).developerMode ? (m(), v("pre", V1, o(JSON.stringify({
                changedFiles: a(f).data.gitStatus.changedFiles,
                stageableChangedFiles: a(f).data.gitStatus.stageableChangedFiles,
                skippedEmbeddedRepos: a(f).data.gitStatus.skippedEmbeddedRepos
              }, null, 2)), 1)) : (m(), v("p", G1, o(a(s).label("原始保护范围列表已收纳到开发者模式中。若要逐条检查 changed files 或 skipped repos，请先到 Settings 打开开发者模式。", "The raw protection-scope payload now stays behind developer mode. Enable it from Settings when you need to inspect changed files or skipped repositories one by one.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          X(oe, {
            title: a(s).label(".gitignore 建议", ".gitignore suggestions"),
            eyebrow: "Ignore rules"
          }, {
            default: le(() => [
              n("p", B1, o(a(s).label("当检测到新的嵌套仓库时，可以先看建议块，再一键追加推荐规则。", "When Guard detects new nested repositories, review the suggestion block first and then append the recommended rules with one action.")), 1),
              n("div", H1, [
                n("article", j1, [
                  n("p", W1, o(a(s).label("嵌套仓库", "Embedded repos")), 1),
                  n("strong", null, o(a(f).data.gitIgnorePreview.embeddedRepos.length), 1),
                  n("span", null, o(a(s).label("需要单独维护的子仓库", "Child repositories that should be maintained separately")), 1)
                ]),
                n("article", K1, [
                  n("p", z1, o(a(s).label("待追加规则", "Missing rules")), 1),
                  n("strong", null, o(a(f).data.gitIgnorePreview.missingEntries.length), 1),
                  n("span", null, o(a(f).data.gitIgnorePreview.gitignorePath), 1)
                ])
              ]),
              a(s).developerMode ? (m(), v("pre", q1, o(a(f).data.gitIgnorePreview.appendBlock || a(s).label("当前没有需要追加的规则。", "There are no extra rules to append right now.")), 1)) : (m(), v("p", J1, o(a(s).label("推荐规则的原始追加块已收纳到开发者模式中。若你需要逐行检查 appendBlock，请先到 Settings 打开开发者模式。", "The raw append block for recommended rules now stays behind developer mode. Enable it from Settings if you need to inspect the exact appendBlock line by line.")), 1)),
              n("div", Q1, [
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: g.value === "gitignore",
                  onClick: T[6] || (T[6] = (y) => W("gitignore"))
                }, o(g.value === "gitignore" ? a(s).label("写入中…", "Applying…") : a(s).label("追加推荐规则", "Append recommended rules")), 9, Y1)
              ])
            ]),
            _: 1
          }, 8, ["title"])
        ], 64))
      ], 64)) : ue("", !0)
    ]));
  }
});
function X1() {
  return xe("/api/agents");
}
const ew = { class: "page-stack" }, tw = { class: "page-header" }, sw = { class: "page-header__eyebrow" }, nw = { class: "page-header__title" }, lw = { class: "page-header__description" }, aw = {
  key: 0,
  class: "page-empty"
}, iw = {
  key: 1,
  class: "page-empty page-empty--error"
}, ow = {
  key: 0,
  class: "status-banner status-banner--warning"
}, rw = { class: "stat-grid" }, cw = { class: "stat-card" }, uw = { class: "stat-card__label" }, dw = { class: "stat-card" }, fw = { class: "stat-card__label" }, pw = { class: "stat-card" }, hw = { class: "stat-card__label" }, gw = { class: "stat-card" }, _w = { class: "stat-card__label" }, mw = {
  key: 0,
  class: "provider-stack"
}, bw = { class: "provider-card__header" }, vw = { class: "pill-row" }, yw = {
  key: 0,
  class: "pill pill--success"
}, ww = {
  key: 1,
  class: "pill pill--muted"
}, $w = { class: "mini-list" }, kw = { class: "mini-list__item mini-list__item--stack" }, Sw = { class: "mini-list__item mini-list__item--stack" }, Cw = { class: "pill-row" }, xw = { class: "page-actions" }, Rw = ["onClick"], Ew = {
  key: 1,
  class: "page-empty"
}, Tw = /* @__PURE__ */ Le({
  __name: "RolesPage",
  setup(e) {
    let t = null;
    const s = je(), l = El(), i = Tl(), r = at(() => X1(), t, { immediate: !1 }), c = z(() => {
      var h;
      return ((h = r.data) == null ? void 0 : h.agents) || [];
    }), u = z(() => c.value.filter((h) => h.isDefault).length), d = z(() => c.value.filter((h) => h.workspaceExists).length), g = z(() => c.value.filter((h) => f(h)).length);
    function f(h) {
      return h.docStatus.soul && h.docStatus.user && h.docStatus.agents && h.docStatus.memory;
    }
    function p(h) {
      i.setMode("all"), i.setCurrentPath(h.resolvedWorkspace), i.setSelectedFilePath(""), i.setSelectedMemoryFilePath(""), l.push("/files");
    }
    return Pe(() => r.data, (h) => {
      h && (t = h);
    }), ze(() => {
      r.execute({ silent: !!r.data });
    }), (h, _) => (m(), v("div", ew, [
      n("header", tw, [
        n("div", null, [
          n("p", sw, o(a(s).label("角色 / Third slice", "Roles / Third slice")), 1),
          n("h2", nw, o(a(s).label("角色目录", "Role catalog")), 1),
          n("p", lw, o(a(s).label("先把 Agent 目录、默认角色和工作区文档健康度迁进新壳层里，方便后续与文件视图和会话视图打通。", "Move the agent catalog, default role state, and workspace doc health into the new shell so it can connect naturally with Files and Sessions next.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: _[0] || (_[0] = ($) => a(r).execute({ silent: !0 }))
        }, o(a(r).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("Refresh", "Refresh")), 1)
      ]),
      a(r).loading && !a(r).data ? (m(), v("div", aw, o(a(s).label("正在读取角色目录…", "Loading the role catalog…")), 1)) : a(r).error && !a(r).data ? (m(), v("div", iw, o(a(r).error), 1)) : (m(), v(Y, { key: 2 }, [
        a(r).error ? (m(), v("div", ow, o(a(s).label("宸蹭繚鐣欎笂涓€鐗堣鑹茬洰褰曪紝浣嗗悗鍙板埛鏂板け璐ワ細", "The last role catalog is still on screen, but the background refresh failed: ")) + o(a(r).error), 1)) : ue("", !0),
        X(oe, {
          title: a(s).label("团队概览", "Team overview"),
          eyebrow: "Summary"
        }, {
          default: le(() => [
            n("div", rw, [
              n("article", cw, [
                n("p", uw, o(a(s).label("角色总数", "Roles")), 1),
                n("strong", null, o(a(ge)(c.value.length)), 1),
                n("span", null, o(a(s).label("当前已接入到 Guard 的角色目录", "Role entries currently discovered by Guard")), 1)
              ]),
              n("article", dw, [
                n("p", fw, o(a(s).label("默认角色", "Default role")), 1),
                n("strong", null, o(a(ge)(u.value)), 1),
                n("span", null, o(u.value > 0 ? a(s).label("至少有一个默认角色", "At least one default role is configured") : a(s).label("还没有默认角色", "No default role is configured yet")), 1)
              ]),
              n("article", pw, [
                n("p", hw, o(a(s).label("工作区可用", "Workspaces ready")), 1),
                n("strong", null, o(a(ge)(d.value)), 1),
                n("span", null, o(a(s).label("对应的工作区目录已经存在", "The mapped workspace directory already exists")), 1)
              ]),
              n("article", gw, [
                n("p", _w, o(a(s).label("关键文档齐全", "Core docs ready")), 1),
                n("strong", null, o(a(ge)(g.value)), 1),
                _[1] || (_[1] = n("span", null, "SOUL / USER / AGENTS / MEMORY", -1))
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        X(oe, {
          title: a(s).label("角色成员", "Role entries"),
          eyebrow: "Catalog"
        }, {
          default: le(() => [
            c.value.length ? (m(), v("div", mw, [
              (m(!0), v(Y, null, we(c.value, ($) => (m(), v("article", {
                key: $.id,
                class: "provider-card"
              }, [
                n("header", bw, [
                  n("div", null, [
                    n("strong", null, o($.name), 1),
                    n("p", null, o($.resolvedWorkspace || $.workspace), 1)
                  ]),
                  n("div", vw, [
                    $.isDefault ? (m(), v("span", yw, o(a(s).label("默认", "Default")), 1)) : (m(), v("span", ww, o($.id), 1)),
                    n("span", {
                      class: _e(["pill", $.workspaceExists ? "pill--success" : "pill--warning"])
                    }, o($.workspaceExists ? a(s).label("工作区就绪", "Workspace ready") : a(s).label("工作区缺失", "Workspace missing")), 3)
                  ])
                ]),
                n("div", $w, [
                  n("div", kw, [
                    n("strong", null, o(a(s).label("模型路由", "Model route")), 1),
                    n("p", null, o($.modelId || a(s).label("沿用默认模型", "Uses the default model route")), 1)
                  ]),
                  n("div", Sw, [
                    n("strong", null, o(a(s).label("关键文档", "Core docs")), 1),
                    n("div", Cw, [
                      n("span", {
                        class: _e(["pill", $.docStatus.soul ? "pill--success" : "pill--warning"])
                      }, "SOUL", 2),
                      n("span", {
                        class: _e(["pill", $.docStatus.user ? "pill--success" : "pill--warning"])
                      }, "USER", 2),
                      n("span", {
                        class: _e(["pill", $.docStatus.agents ? "pill--success" : "pill--warning"])
                      }, "AGENTS", 2),
                      n("span", {
                        class: _e(["pill", $.docStatus.memory ? "pill--success" : "pill--warning"])
                      }, "MEMORY", 2)
                    ])
                  ])
                ]),
                n("div", xw, [
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    onClick: (x) => p($)
                  }, o(a(s).label("打开对应工作区", "Open workspace")), 9, Rw)
                ])
              ]))), 128))
            ])) : (m(), v("div", Ew, o(a(s).label("还没有发现可用角色。请先检查 OpenClaw 配置和安装状态。", "No role entries were discovered yet. Check the OpenClaw configuration and installation state first.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64))
    ]));
  }
});
function Aw(e, t = 100) {
  const s = new URLSearchParams({
    q: e,
    limit: String(t)
  });
  return xe(`/api/search?${s.toString()}`);
}
const Pw = { class: "page-stack" }, Ow = { class: "page-header" }, Mw = { class: "page-header__eyebrow" }, Iw = { class: "page-header__title" }, Nw = { class: "page-header__description" }, Dw = {
  class: "inline-link inline-link--primary",
  type: "submit"
}, Lw = {
  key: 0,
  class: "page-empty page-empty--error"
}, Fw = { class: "stat-grid" }, Uw = { class: "stat-card" }, Vw = { class: "stat-card__label" }, Gw = { class: "stat-card" }, Bw = { class: "stat-card__label" }, Hw = { class: "stat-card" }, jw = { class: "stat-card__label" }, Ww = { class: "stat-card" }, Kw = { class: "stat-card__label" }, zw = {
  key: 0,
  class: "page-empty"
}, qw = {
  key: 1,
  class: "provider-stack"
}, Jw = { class: "provider-card__header" }, Qw = { class: "pill-row" }, Yw = { class: "page-actions" }, Zw = ["onClick"], Xw = {
  key: 2,
  class: "page-empty"
}, e$ = /* @__PURE__ */ Le({
  __name: "SearchPage",
  setup(e) {
    const t = je(), s = El(), l = it(), i = Tl(), r = /* @__PURE__ */ H(i.searchQuery), c = /* @__PURE__ */ H(!1), u = /* @__PURE__ */ H(null), d = /* @__PURE__ */ H(!1), g = /* @__PURE__ */ H([]), f = z(() => new Set(g.value.map((_) => _.path)).size);
    Pe(r, (_) => {
      i.setSearchQuery(_);
    });
    async function p() {
      const _ = r.value.trim();
      if (i.setSearchQuery(_), d.value = !0, u.value = null, !_) {
        g.value = [];
        return;
      }
      c.value = !0;
      try {
        const $ = await Aw(_, 100);
        g.value = $.results || [];
      } catch ($) {
        u.value = $ instanceof Error ? $.message : String($);
      } finally {
        c.value = !1;
      }
    }
    function h(_) {
      i.requestReveal(_.path), l.pushToast({
        tone: "info",
        message: t.label("已切到文件页并定位结果。", "Switched to Files and queued the selected result."),
        durationMs: 2200
      }), s.push("/files");
    }
    return ze(() => {
      i.searchQuery.trim() && p();
    }), (_, $) => (m(), v("div", Pw, [
      n("header", Ow, [
        n("div", null, [
          n("p", Mw, o(a(t).label("搜索 / Third slice", "Search / Third slice")), 1),
          n("h2", Iw, o(a(t).label("工作区搜索", "Workspace search")), 1),
          n("p", Nw, o(a(t).label("先让搜索直接覆盖 Guard 管理的工作区与核心记忆，并且可以一跳回到文件页继续编辑。", "Start with search across Guard-managed workspaces and core memory, then jump straight back into Files to continue editing.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: p
        }, o(c.value ? a(t).label("搜索中…", "Searching…") : a(t).label("Search", "Search")), 1)
      ]),
      X(oe, {
        title: a(t).label("搜索条件", "Search query"),
        eyebrow: "Query"
      }, {
        default: le(() => [
          n("form", {
            class: "search-form",
            onSubmit: _s(p, ["prevent"])
          }, [
            $e(n("input", {
              "onUpdate:modelValue": $[0] || ($[0] = (x) => r.value = x),
              class: "settings-input",
              type: "text",
              placeholder: "SOUL.md / qwen / fallback / cron"
            }, null, 512), [
              [Ne, r.value]
            ]),
            n("button", Dw, o(c.value ? a(t).label("搜索中…", "Searching…") : a(t).label("开始搜索", "Run search")), 1)
          ], 32)
        ]),
        _: 1
      }, 8, ["title"]),
      u.value ? (m(), v("div", Lw, o(u.value), 1)) : ue("", !0),
      X(oe, {
        title: a(t).label("结果概览", "Result overview"),
        eyebrow: "Summary"
      }, {
        default: le(() => [
          n("div", Fw, [
            n("article", Uw, [
              n("p", Vw, o(a(t).label("命中条数", "Matches")), 1),
              n("strong", null, o(a(ge)(g.value.length)), 1),
              n("span", null, o(a(t).label("当前查询返回的匹配行数", "Matched lines returned for the current query")), 1)
            ]),
            n("article", Gw, [
              n("p", Bw, o(a(t).label("涉及文件", "Files")), 1),
              n("strong", null, o(a(ge)(f.value)), 1),
              n("span", null, o(a(t).label("至少命中一次的文件数量", "Files that matched at least once")), 1)
            ]),
            n("article", Hw, [
              n("p", jw, o(a(t).label("当前查询", "Current query")), 1),
              n("strong", null, o(r.value.trim() || "-"), 1),
              n("span", null, o(r.value.trim() ? a(t).label("结果来自当前搜索词", "Results are based on the current query") : a(t).label("还没有输入搜索词", "No search query yet")), 1)
            ]),
            n("article", Ww, [
              n("p", Kw, o(a(t).label("打开方式", "Open flow")), 1),
              n("strong", null, o(a(t).label("一跳到文件页", "Jump into Files")), 1),
              n("span", null, o(a(t).label("搜索结果会按文件或核心记忆模式自动定位", "Results automatically open in file or core-memory mode")), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      X(oe, {
        title: a(t).label("搜索结果", "Results"),
        eyebrow: "Results"
      }, {
        default: le(() => [
          c.value ? (m(), v("div", zw, o(a(t).label("正在查找匹配结果…", "Searching for matching results…")), 1)) : g.value.length ? (m(), v("div", qw, [
            (m(!0), v(Y, null, we(g.value, (x) => (m(), v("article", {
              key: `${x.path}:${x.line}:${x.preview}`,
              class: "provider-card"
            }, [
              n("header", Jw, [
                n("div", null, [
                  n("strong", null, o(x.relativePath || x.path), 1),
                  n("p", null, o(`L${x.line}`), 1)
                ]),
                n("div", Qw, [
                  n("span", {
                    class: _e(["pill", a(nl)(x.path) ? "pill--success" : "pill--info"])
                  }, o(a(nl)(x.path) ? a(t).label("核心记忆", "Core memory") : a(t).label("文件", "File")), 3)
                ])
              ]),
              n("p", null, o(x.preview), 1),
              n("div", Yw, [
                n("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  onClick: (j) => h(x)
                }, o(a(t).label("在文件页打开", "Open in Files")), 9, Zw)
              ])
            ]))), 128))
          ])) : (m(), v("div", Xw, o(d.value ? a(t).label("当前搜索词没有命中任何文件。", "The current query did not match any files.") : a(t).label("输入关键词后开始搜索。", "Enter a query to start searching.")), 1))
        ]),
        _: 1
      }, 8, ["title"])
    ]));
  }
});
function t$() {
  return xe("/api/audit");
}
function s$() {
  return xe("/api/profiles");
}
function n$(e) {
  return De("/api/profiles/apply", { profile: e });
}
function l$(e) {
  return xe(`/api/harden/steps?platform=${encodeURIComponent(e)}`);
}
const a$ = { class: "page-stack" }, i$ = { class: "page-header" }, o$ = { class: "page-header__eyebrow" }, r$ = { class: "page-header__title" }, c$ = { class: "page-header__description" }, u$ = {
  key: 0,
  class: "page-empty"
}, d$ = {
  key: 1,
  class: "page-empty page-empty--error"
}, f$ = {
  key: 0,
  class: "status-banner status-banner--warning"
}, p$ = { class: "muted-copy" }, h$ = { class: "stat-grid" }, g$ = { class: "stat-card" }, _$ = { class: "stat-card__label" }, m$ = { class: "stat-card" }, b$ = { class: "stat-card__label" }, v$ = { class: "stat-card" }, y$ = { class: "stat-card__label" }, w$ = { class: "provider-stack" }, $$ = { class: "provider-card__header" }, k$ = { class: "pill pill--muted" }, S$ = { class: "mini-list" }, C$ = { class: "provider-card__header" }, x$ = {
  key: 0,
  class: "muted-copy"
}, R$ = {
  key: 0,
  class: "page-empty"
}, E$ = {
  key: 1,
  class: "page-empty page-empty--error"
}, T$ = {
  key: 0,
  class: "status-banner status-banner--warning"
}, A$ = { class: "muted-copy" }, P$ = { class: "provider-stack" }, O$ = { class: "provider-card__header" }, M$ = { class: "muted-copy" }, I$ = { class: "pill pill--info" }, N$ = { class: "settings-grid settings-grid--wide" }, D$ = { class: "settings-field" }, L$ = { class: "mini-list" }, F$ = { class: "settings-field" }, U$ = {
  key: 0,
  class: "code-panel"
}, V$ = {
  key: 1,
  class: "muted-copy"
}, G$ = { class: "settings-field" }, B$ = {
  key: 0,
  class: "code-panel"
}, H$ = {
  key: 1,
  class: "muted-copy"
}, j$ = { class: "page-actions" }, W$ = ["disabled", "onClick"], K$ = {
  key: 0,
  class: "page-empty"
}, z$ = {
  key: 1,
  class: "page-empty page-empty--error"
}, q$ = {
  key: 0,
  class: "status-banner status-banner--warning"
}, J$ = { class: "muted-copy" }, Q$ = { class: "pill-row" }, Y$ = ["href"], Z$ = { class: "provider-stack" }, X$ = { class: "provider-card__header" }, ek = { class: "muted-copy" }, tk = {
  key: 0,
  class: "code-panel"
}, sk = {
  key: 1,
  class: "muted-copy"
}, nk = /* @__PURE__ */ Le({
  __name: "SecurityPage",
  setup(e) {
    function t() {
      if (typeof navigator > "u") return "linux";
      const N = navigator.platform.toLowerCase();
      return N.includes("win") ? "windows" : N.includes("mac") ? "macos" : "linux";
    }
    const s = je(), l = it(), i = /* @__PURE__ */ H("audit"), r = /* @__PURE__ */ H(t()), c = /* @__PURE__ */ H("");
    let u = null, d = null;
    const g = /* @__PURE__ */ new Map(), f = at(() => t$(), u, { immediate: !1 }), p = at(() => s$(), d, { immediate: !1 }), h = at(
      () => l$(r.value),
      g.get(r.value) || null,
      { immediate: !1 }
    ), _ = z(() => [
      { id: "audit", label: s.label("安全检查", "Security checks") },
      { id: "profiles", label: s.label("权限模式", "Permission modes") },
      { id: "hardening", label: s.label("主机加固", "Host hardening") }
    ]), $ = z(() => {
      var Z, L;
      const N = /* @__PURE__ */ new Map();
      for (const T of ((Z = f.data) == null ? void 0 : Z.results) || [])
        N.has(T.category) || N.set(T.category, []), (L = N.get(T.category)) == null || L.push(T);
      return Array.from(N.entries());
    });
    Pe(() => f.data, (N) => {
      N && (u = N);
    }), Pe(() => p.data, (N) => {
      N && (d = N);
    }), Pe(() => h.data, (N) => {
      N && g.set(r.value, N);
    }), Pe(
      i,
      (N) => {
        N === "audit" && !f.data && !f.loading && f.execute(), N === "profiles" && !p.data && !p.loading && p.execute(), N === "hardening" && !h.data && !h.loading && h.execute();
      },
      { immediate: !0 }
    ), Pe(r, () => {
      h.data = g.get(r.value) || null, i.value === "hardening" && h.execute({ silent: !!h.data });
    });
    function x(N) {
      return N === "pass" ? "pill--success" : N === "warn" ? "pill--warning" : "pill--danger";
    }
    function j(N) {
      return N === "pass" ? s.label("通过", "Pass") : N === "warn" ? s.label("警告", "Warning") : s.label("失败", "Fail");
    }
    async function V() {
      if (i.value === "audit") {
        await f.execute({ silent: !!f.data });
        return;
      }
      if (i.value === "profiles") {
        await p.execute({ silent: !!p.data });
        return;
      }
      await h.execute({ silent: !!h.data });
    }
    async function F(N) {
      c.value = N;
      try {
        const Z = await n$(N);
        l.pushToast({
          tone: Z.success ? "success" : "error",
          message: Z.message
        });
      } catch (Z) {
        l.pushToast({
          tone: "error",
          message: Z instanceof Error ? Z.message : String(Z)
        });
      } finally {
        c.value = "";
      }
    }
    function W(N) {
      i.value = N;
    }
    return (N, Z) => (m(), v("div", a$, [
      n("header", i$, [
        n("div", null, [
          n("p", o$, o(a(s).label("安全 / Second slice", "Security / Second slice")), 1),
          n("h2", r$, o(a(s).label("安全基线", "Security baseline")), 1),
          n("p", c$, o(a(s).label("把长页面拆成页内分栏，只在当前视图读取必要数据，让安全页更像决策面板，而不是说明书。", "Split the long page into internal tabs and load only the current view so the security page feels like a decision panel instead of a manual.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: V
        }, o(i.value === "audit" && a(f).refreshing || i.value === "profiles" && a(p).refreshing || i.value === "hardening" && a(h).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新当前视图", "Refresh current view")), 1)
      ]),
      X(Sn, {
        items: _.value,
        "active-id": i.value,
        onChange: W
      }, null, 8, ["items", "active-id"]),
      i.value === "audit" ? (m(), v(Y, { key: 0 }, [
        a(f).loading && !a(f).data ? (m(), v("div", u$, o(a(s).label("正在读取安全检查结果…", "Loading security checks…")), 1)) : a(f).error && !a(f).data ? (m(), v("div", d$, o(a(f).error), 1)) : a(f).data ? (m(), v(Y, { key: 2 }, [
          a(f).error ? (m(), v("div", f$, o(a(s).label("已保留上一版安全检查快照，但后台刷新失败：", "The last security-check snapshot is still on screen, but the background refresh failed: ")) + o(a(f).error), 1)) : ue("", !0),
          X(oe, {
            title: a(s).label("安全检查（Beta）", "Security checks (Beta)"),
            eyebrow: "Audit"
          }, {
            default: le(() => [
              n("p", p$, o(a(s).label("这里更像建议型检查，而不是正式合规证明。优先处理失败项，其次处理警告项。", "This area behaves like advisory checks rather than a formal proof of compliance. Handle failures first, then warnings.")), 1),
              n("div", h$, [
                n("article", g$, [
                  n("p", _$, o(a(s).label("通过项", "Pass")), 1),
                  n("strong", null, o(a(f).data.summary.pass), 1),
                  n("span", null, o(a(s).label("当前无需处理", "No action needed right now")), 1)
                ]),
                n("article", m$, [
                  n("p", b$, o(a(s).label("警告项", "Warning")), 1),
                  n("strong", null, o(a(f).data.summary.warn), 1),
                  n("span", null, o(a(s).label("建议尽快检查", "Recommended to review soon")), 1)
                ]),
                n("article", v$, [
                  n("p", y$, o(a(s).label("失败项", "Fail")), 1),
                  n("strong", null, o(a(f).data.summary.fail), 1),
                  n("span", null, o(a(s).label("需要优先处理", "Highest priority")), 1)
                ])
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(oe, {
            title: a(s).label("检查详情", "Detailed findings"),
            eyebrow: "Details"
          }, {
            default: le(() => [
              n("div", w$, [
                (m(!0), v(Y, null, we($.value, ([L, T]) => (m(), v("article", {
                  key: L,
                  class: "provider-card"
                }, [
                  n("header", $$, [
                    n("strong", null, o(L), 1),
                    n("span", k$, o(T.length), 1)
                  ]),
                  n("div", S$, [
                    (m(!0), v(Y, null, we(T, (y) => (m(), v("div", {
                      key: `${L}-${y.item}`,
                      class: "mini-list__item mini-list__item--stack"
                    }, [
                      n("div", C$, [
                        n("strong", null, o(y.item), 1),
                        n("span", {
                          class: _e(["pill", x(y.status)])
                        }, o(j(y.status)), 3)
                      ]),
                      n("p", null, o(y.message), 1),
                      y.fix ? (m(), v("p", x$, o(a(s).label("建议处理：", "Suggested fix: ")) + o(y.fix), 1)) : ue("", !0)
                    ]))), 128))
                  ])
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : ue("", !0)
      ], 64)) : i.value === "profiles" ? (m(), v(Y, { key: 1 }, [
        a(p).loading && !a(p).data ? (m(), v("div", R$, o(a(s).label("正在读取权限模式…", "Loading permission modes…")), 1)) : a(p).error && !a(p).data ? (m(), v("div", E$, o(a(p).error), 1)) : a(p).data ? (m(), v(Y, { key: 2 }, [
          a(p).error ? (m(), v("div", T$, o(a(s).label("已保留上一版权限模式快照，但后台刷新失败：", "The last permission-mode snapshot is still on screen, but the background refresh failed: ")) + o(a(p).error), 1)) : ue("", !0),
          X(oe, {
            title: a(s).label("权限模式", "Permission modes"),
            eyebrow: "Profiles"
          }, {
            default: le(() => [
              n("p", A$, o(a(s).label("这些模式当前只会更新 OpenClaw 的工具权限配置，不会自动完成系统账户、ACL、Docker 或整机加固。", "These modes currently update only the OpenClaw tool-permission config. They do not automatically complete system users, ACLs, Docker, or full host hardening.")), 1)
            ]),
            _: 1
          }, 8, ["title"]),
          n("div", P$, [
            (m(!0), v(Y, null, we(a(p).data, (L) => (m(), He(oe, {
              key: L.key,
              title: L.name,
              eyebrow: "Profile"
            }, {
              default: le(() => {
                var T, y, C, A, ce, re;
                return [
                  n("div", O$, [
                    n("p", M$, o(L.description), 1),
                    n("span", I$, o(L.riskLevel || a(s).label("未标注风险等级", "Risk level not declared")), 1)
                  ]),
                  n("div", N$, [
                    n("div", D$, [
                      n("span", null, o(a(s).label("建议使用场景", "Recommended use cases")), 1),
                      n("div", L$, [
                        (m(!0), v(Y, null, we(L.recommendations || [], (pe) => (m(), v("div", {
                          key: pe,
                          class: "mini-list__item mini-list__item--stack"
                        }, [
                          n("p", null, o(pe), 1)
                        ]))), 128))
                      ])
                    ]),
                    n("div", F$, [
                      n("span", null, o(a(s).label("允许规则", "Allow rules")), 1),
                      a(s).developerMode ? (m(), v("pre", U$, o((((T = L.tools) == null ? void 0 : T.allow) || []).join(`
`) || "(none)"), 1)) : (m(), v("p", V$, o(a(s).label(`当前包含 ${(((y = L.tools) == null ? void 0 : y.allow) || []).length} 条允许规则。需要查看原始规则列表时，请先到 Settings 打开开发者模式。`, `${(((C = L.tools) == null ? void 0 : C.allow) || []).length} allow rules are included. Enable developer mode from Settings when you need the raw rule list.`)), 1))
                    ]),
                    n("div", G$, [
                      n("span", null, o(a(s).label("拒绝规则", "Deny rules")), 1),
                      a(s).developerMode ? (m(), v("pre", B$, o((((A = L.tools) == null ? void 0 : A.deny) || []).join(`
`) || "(none)"), 1)) : (m(), v("p", H$, o(a(s).label(`当前包含 ${(((ce = L.tools) == null ? void 0 : ce.deny) || []).length} 条拒绝规则。需要查看原始规则列表时，请先到 Settings 打开开发者模式。`, `${(((re = L.tools) == null ? void 0 : re.deny) || []).length} deny rules are included. Enable developer mode from Settings when you need the raw rule list.`)), 1))
                    ])
                  ]),
                  n("div", j$, [
                    n("button", {
                      class: "inline-link inline-link--primary",
                      type: "button",
                      disabled: c.value === L.key,
                      onClick: (pe) => F(L.key)
                    }, o(c.value === L.key ? a(s).label("应用中…", "Applying…") : a(s).label("应用权限模式", "Apply permission mode")), 9, W$)
                  ])
                ];
              }),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : ue("", !0)
      ], 64)) : (m(), v(Y, { key: 2 }, [
        a(h).loading && !a(h).data ? (m(), v("div", K$, o(a(s).label("正在读取主机加固建议…", "Loading hardening guidance…")), 1)) : a(h).error && !a(h).data ? (m(), v("div", z$, o(a(h).error), 1)) : a(h).data ? (m(), v(Y, { key: 2 }, [
          a(h).error ? (m(), v("div", q$, o(a(s).label("已保留上一版主机加固快照，但后台刷新失败：", "The last hardening snapshot is still on screen, but the background refresh failed: ")) + o(a(h).error), 1)) : ue("", !0),
          X(oe, {
            title: a(s).label("主机加固指南（Beta）", "Host hardening guide (Beta)"),
            eyebrow: "Hardening"
          }, {
            default: le(() => [
              n("p", J$, o(a(s).label("基础建议在所有平台上都类似：尽量使用非管理员账户运行，并把工作区边界收紧。Windows 上的独立低权限账户更适合长期后台运行或共享机器场景，不是所有人的默认强制项。", "The baseline is similar on every platform: prefer non-admin execution and keep the workspace boundary tight. On Windows, a dedicated low-privilege account is better treated as an advanced option for long-running or shared-machine setups, not a blanket default requirement.")), 1),
              n("div", Q$, [
                n("button", {
                  class: _e(["pill-button", { "pill-button--active": r.value === "windows" }]),
                  type: "button",
                  onClick: Z[0] || (Z[0] = (L) => r.value = "windows")
                }, "Windows", 2),
                n("button", {
                  class: _e(["pill-button", { "pill-button--active": r.value === "macos" }]),
                  type: "button",
                  onClick: Z[1] || (Z[1] = (L) => r.value = "macos")
                }, "macOS", 2),
                n("button", {
                  class: _e(["pill-button", { "pill-button--active": r.value === "linux" }]),
                  type: "button",
                  onClick: Z[2] || (Z[2] = (L) => r.value = "linux")
                }, "Linux", 2),
                n("a", {
                  class: "inline-link",
                  href: `/api/harden/script?platform=${r.value}`
                }, o(a(s).label("下载脚本", "Download script")), 9, Y$)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          n("div", Z$, [
            (m(!0), v(Y, null, we(a(h).data.steps, (L) => (m(), He(oe, {
              key: L.id,
              title: L.title,
              eyebrow: "Step"
            }, {
              default: le(() => {
                var T;
                return [
                  n("div", X$, [
                    n("p", ek, o(L.description), 1),
                    n("span", {
                      class: _e(["pill", L.optional ? "pill--muted" : "pill--warning"])
                    }, o(L.optional ? a(s).label("可选", "Optional") : a(s).label("建议", "Recommended")), 3)
                  ]),
                  a(s).developerMode ? (m(), v("pre", tk, o((L.commands || []).join(`
`) || a(s).label("当前没有附带命令。", "No commands are attached to this step.")), 1)) : (m(), v("p", sk, o((T = L.commands) != null && T.length ? a(s).label(`这个步骤附带 ${L.commands.length} 条命令，默认已收纳到开发者模式中。`, `This step includes ${L.commands.length} commands, which now stay behind developer mode by default.`) : a(s).label("这个步骤当前没有附带命令。", "No commands are attached to this step right now.")), 1))
                ];
              }),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : ue("", !0)
      ], 64))
    ]));
  }
});
function lk() {
  return xe("/api/sessions");
}
const ak = { class: "page-stack" }, ik = { class: "page-header" }, ok = { class: "page-header__eyebrow" }, rk = { class: "page-header__title" }, ck = { class: "page-header__description" }, uk = {
  key: 0,
  class: "page-empty"
}, dk = {
  key: 1,
  class: "page-empty page-empty--error"
}, fk = {
  key: 0,
  class: "status-banner status-banner--warning"
}, pk = { class: "stat-grid" }, hk = { class: "stat-card" }, gk = { class: "stat-card__label" }, _k = { class: "stat-card" }, mk = { class: "stat-card__label" }, bk = { class: "stat-card" }, vk = { class: "stat-card__label" }, yk = { class: "stat-card" }, wk = { class: "stat-card__label" }, $k = { class: "stat-card" }, kk = { class: "stat-card__label" }, Sk = { class: "stat-card" }, Ck = { class: "stat-card__label" }, xk = { class: "stat-grid" }, Rk = { class: "stat-card" }, Ek = { class: "stat-card" }, Tk = { class: "stat-card__label" }, Ak = { class: "stat-card" }, Pk = { class: "stat-card__label" }, Ok = { class: "stat-card" }, Mk = { class: "stat-card__label" }, Ik = { class: "stat-card" }, Nk = { class: "stat-card__label" }, Dk = { class: "stat-card" }, Lk = { class: "stat-card__label" }, Fk = {
  key: 0,
  class: "provider-stack"
}, Uk = { class: "provider-card__header" }, Vk = { class: "pill-row" }, Gk = { class: "pill pill--info" }, Bk = { class: "mini-list" }, Hk = { class: "mini-list__item mini-list__item--stack" }, jk = { class: "mini-list__item mini-list__item--stack" }, Wk = { class: "mini-list__item mini-list__item--stack" }, Kk = { class: "mini-list__item mini-list__item--stack" }, zk = {
  key: 1,
  class: "page-empty"
}, qk = { class: "page-two-column" }, Jk = {
  key: 0,
  class: "provider-stack"
}, Qk = { class: "provider-card__header" }, Yk = { class: "pill pill--info" }, Zk = { class: "mini-list" }, Xk = {
  key: 1,
  class: "page-empty"
}, eS = {
  key: 0,
  class: "provider-stack"
}, tS = { class: "provider-card__header" }, sS = { class: "pill pill--muted" }, nS = {
  key: 1,
  class: "page-empty"
}, lS = { class: "list-stack" }, aS = { class: "stat-grid" }, iS = { class: "stat-card" }, oS = { class: "stat-card__label" }, rS = { class: "stat-card" }, cS = { class: "stat-card__label" }, uS = { class: "stat-card" }, dS = { class: "stat-card__label" }, fS = { class: "stat-card" }, pS = { class: "stat-card__label" }, hS = /* @__PURE__ */ Le({
  __name: "SessionsPage",
  setup(e) {
    let t = null;
    const s = je(), l = at(() => lk(), t, { immediate: !1 }), i = z(() => {
      var h;
      return (h = l.data) == null ? void 0 : h.snapshot;
    }), r = z(() => {
      var h;
      return ((h = i.value) == null ? void 0 : h.sessions) || [];
    }), c = z(() => {
      var h, _;
      return ((_ = (h = i.value) == null ? void 0 : h.sessionsMeta) == null ? void 0 : _.byAgent) || [];
    }), u = z(() => r.value.filter((h) => !["ended", "finished", "closed"].includes(h.status))), d = z(() => {
      var _;
      const h = (_ = l.data) == null ? void 0 : _.costSummary;
      return h ? Number.isFinite(h.totalEstimatedCost) && (!!h.pricingUnit || h.totalEstimatedCost > 0) : !1;
    });
    function g() {
      var _;
      const h = (_ = l.data) == null ? void 0 : _.costSummary;
      return !h || !d.value ? s.label("无法估算", "Unavailable") : Ia(h.totalEstimatedCost, h.pricingUnit || "USD");
    }
    function f() {
      return d.value ? s.label("仅供本地观察，不代表官方账单", "For local observation only, not an official bill") : s.label("缺少可靠单价或用量数据，当前不显示金额", "Pricing or usage data is incomplete, so no amount is shown");
    }
    function p(h) {
      return ["ended", "finished", "closed"].includes(h.status) ? "pill--muted" : ["error", "failed", "aborted"].includes(h.status) ? "pill--danger" : "pill--success";
    }
    return Pe(() => l.data, (h) => {
      h && (t = h);
    }), ze(() => {
      l.execute({ silent: !!l.data });
    }), (h, _) => (m(), v("div", ak, [
      n("header", ik, [
        n("div", null, [
          n("p", ok, o(a(s).label("会话 / Third slice", "Sessions / Third slice")), 1),
          n("h2", rk, o(a(s).label("会话观察台", "Session observer")), 1),
          n("p", ck, o(a(s).label("把运行时快照、按角色会话分布和用量估算迁进新壳层里，同时继续复用现有的共享缓存与后台刷新语义。", "Move runtime snapshots, per-role session distribution, and usage estimates into the new shell while keeping the current shared cache and background refresh semantics.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: _[0] || (_[0] = ($) => a(l).execute({ silent: !0 }))
        }, o(a(l).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("Refresh", "Refresh")), 1)
      ]),
      a(l).loading && !a(l).data ? (m(), v("div", uk, o(a(s).label("正在读取会话快照…", "Loading the session snapshot…")), 1)) : a(l).error && !a(l).data ? (m(), v("div", dk, o(a(l).error), 1)) : a(l).data && i.value ? (m(), v(Y, { key: 2 }, [
        a(l).error ? (m(), v("div", fk, o(a(s).label("已保留上一版会话快照，但后台刷新失败：", "The last session snapshot is still on screen, but the background refresh failed: ")) + o(a(l).error), 1)) : ue("", !0),
        X(oe, {
          title: a(s).label("会话总览", "Session overview"),
          eyebrow: "Summary"
        }, {
          default: le(() => {
            var $, x, j, V;
            return [
              n("div", pk, [
                n("article", hk, [
                  n("p", gk, o(a(s).label("会话总数", "Sessions")), 1),
                  n("strong", null, o(a(ge)((($ = i.value.summary) == null ? void 0 : $.sessionCount) ?? r.value.length)), 1),
                  n("span", null, o(((x = i.value.summary) == null ? void 0 : x.defaultModel) || a(s).label("默认模型未知", "Default model is unknown")), 1)
                ]),
                n("article", _k, [
                  n("p", mk, o(a(s).label("活跃会话", "Active now")), 1),
                  n("strong", null, o(a(ge)(u.value.length)), 1),
                  n("span", null, o(a(s).label("当前仍在运行或待执行的会话", "Sessions that are still running or waiting now")), 1)
                ]),
                n("article", bk, [
                  n("p", vk, o(a(s).label("累计 Tokens", "Total tokens")), 1),
                  n("strong", null, o(a(ge)(a(l).data.costSummary.totalTokens)), 1),
                  n("span", null, o(a(s).label("基于共享运行时快照统计", "Counted from the shared runtime snapshot")), 1)
                ]),
                n("article", yk, [
                  n("p", wk, o(a(s).label("用量估算", "Usage estimate")), 1),
                  n("strong", null, o(g()), 1),
                  n("span", null, o(f()), 1)
                ]),
                n("article", $k, [
                  n("p", kk, o(a(s).label("会话索引路径", "Session paths")), 1),
                  n("strong", null, o(a(ge)(((j = i.value.sessionsMeta) == null ? void 0 : j.paths.length) || 0)), 1),
                  n("span", null, o(a(s).label("被 Guard 识别到的会话目录", "Session directories detected by Guard")), 1)
                ]),
                n("article", Sk, [
                  n("p", Ck, o(a(s).label("待处理系统事件", "Queued events")), 1),
                  n("strong", null, o(a(ge)(((V = i.value.summary) == null ? void 0 : V.queuedSystemEvents) || 0)), 1),
                  n("span", null, o(a(s).label("等待处理的系统级事件", "System events that are still waiting")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        X(oe, {
          title: a(s).label("运行环境", "Runtime context"),
          eyebrow: "Runtime"
        }, {
          default: le(() => {
            var $, x, j, V, F, W, N, Z, L, T, y, C, A, ce, re, pe, Re, Ee, G, k, P, be;
            return [
              n("div", xk, [
                n("article", Rk, [
                  _[1] || (_[1] = n("p", { class: "stat-card__label" }, "OS", -1)),
                  n("strong", null, o((($ = i.value.os) == null ? void 0 : $.label) || "-"), 1),
                  n("span", null, o([(x = i.value.os) == null ? void 0 : x.platform, (j = i.value.os) == null ? void 0 : j.arch, (V = i.value.os) == null ? void 0 : V.release].filter(Boolean).join(" / ") || a(s).label("系统信息暂缺", "OS details are missing")), 1)
                ]),
                n("article", Ek, [
                  n("p", Tk, o(a(s).label("记忆检索", "Memory search")), 1),
                  n("strong", null, o(((F = i.value.memory) == null ? void 0 : F.provider) || ((W = i.value.memory) == null ? void 0 : W.backend) || "-"), 1),
                  n("span", null, o([(N = i.value.memory) == null ? void 0 : N.searchMode, ((Z = i.value.memory) == null ? void 0 : Z.dbPath) || ((L = i.value.memory) == null ? void 0 : L.workspaceDir)].filter(Boolean).join(" / ") || a(s).label("记忆运行态信息暂缺", "Memory runtime details are missing")), 1)
                ]),
                n("article", Ak, [
                  n("p", Pk, o(a(s).label("Gateway 服务", "Gateway service")), 1),
                  n("strong", null, o(((T = i.value.gatewayService) == null ? void 0 : T.label) || "-"), 1),
                  n("span", null, o([(y = i.value.gatewayService) == null ? void 0 : y.loadedText, (C = i.value.gatewayService) == null ? void 0 : C.runtimeShort].filter(Boolean).join(" / ") || a(s).label("Gateway 服务信息暂缺", "Gateway service details are missing")), 1)
                ]),
                n("article", Ok, [
                  n("p", Mk, o(a(s).label("Node 服务", "Node service")), 1),
                  n("strong", null, o(((A = i.value.nodeService) == null ? void 0 : A.label) || "-"), 1),
                  n("span", null, o([(ce = i.value.nodeService) == null ? void 0 : ce.loadedText, (re = i.value.nodeService) == null ? void 0 : re.runtimeShort].filter(Boolean).join(" / ") || a(s).label("Node 服务信息暂缺", "Node service details are missing")), 1)
                ]),
                n("article", Ik, [
                  n("p", Nk, o(a(s).label("更新轨道", "Update track")), 1),
                  n("strong", null, o(((pe = i.value.update) == null ? void 0 : pe.channel) || ((Re = i.value.update) == null ? void 0 : Re.installKind) || "-"), 1),
                  n("span", null, o([(Ee = i.value.update) == null ? void 0 : Ee.packageManager, (G = i.value.update) == null ? void 0 : G.latestVersion].filter(Boolean).join(" / ") || a(s).label("更新信息暂缺", "Update details are missing")), 1)
                ]),
                n("article", Dk, [
                  n("p", Lk, o(a(s).label("安全审计", "Security audit")), 1),
                  n("strong", null, o(a(ge)(((k = i.value.securityAudit) == null ? void 0 : k.findingsCount) || 0)), 1),
                  n("span", null, o(`${a(ge)(((P = i.value.securityAudit) == null ? void 0 : P.critical) || 0)} critical / ${a(ge)(((be = i.value.securityAudit) == null ? void 0 : be.warn) || 0)} warn`), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        X(oe, {
          title: a(s).label("当前会话", "Current sessions"),
          eyebrow: "Sessions"
        }, {
          default: le(() => [
            r.value.length ? (m(), v("div", Fk, [
              (m(!0), v(Y, null, we(r.value, ($) => (m(), v("article", {
                key: $.id,
                class: "provider-card"
              }, [
                n("header", Uk, [
                  n("div", null, [
                    n("strong", null, o($.id), 1),
                    n("p", null, o(`${$.agentId} / ${$.modelId}`), 1)
                  ]),
                  n("div", Vk, [
                    n("span", {
                      class: _e(["pill", p($)])
                    }, o($.status || "-"), 3),
                    n("span", Gk, o($.channel || "-"), 1)
                  ])
                ]),
                n("div", Bk, [
                  n("div", Hk, [
                    n("strong", null, o(a(s).label("时间轴", "Timeline")), 1),
                    n("p", null, o(a(s).label("开始：", "Started: ")) + o(a(st)($.startedAt)), 1),
                    n("p", null, o(a(s).label("更新：", "Updated: ")) + o(a(st)($.updatedAt)), 1)
                  ]),
                  n("div", jk, [
                    n("strong", null, o(a(s).label("Token 使用", "Token usage")), 1),
                    n("p", null, o(`${a(ge)($.usage.totalTokens)} tokens`), 1),
                    n("p", null, o(`${a(s).label("输入", "Input")} ${a(ge)($.usage.inputTokens)} / ${a(s).label("输出", "Output")} ${a(ge)($.usage.outputTokens)}`), 1)
                  ]),
                  n("div", Wk, [
                    n("strong", null, o(a(s).label("上下文窗口", "Context window")), 1),
                    n("p", null, o($.contextTokens != null ? a(ge)($.contextTokens) : "-"), 1),
                    n("p", null, o(a(s).label("剩余：", "Remaining: ")) + o($.remainingTokens != null ? a(ge)($.remainingTokens) : "-"), 1)
                  ]),
                  n("div", Kk, [
                    n("strong", null, o(a(s).label("用量估算", "Usage estimate")), 1),
                    n("p", null, o(a(Ia)($.estimatedCost, a(l).data.costSummary.pricingUnit || "USD")), 1),
                    n("p", null, o(a(s).label("上下文占比：", "Context used: ")) + o(a(xf)($.percentUsed)), 1)
                  ])
                ])
              ]))), 128))
            ])) : (m(), v("div", zk, o(a(s).label("当前还没有会话记录。", "There are no session records right now.")), 1))
          ]),
          _: 1
        }, 8, ["title"]),
        n("div", qk, [
          X(oe, {
            title: a(s).label("按角色分布", "By role"),
            eyebrow: "Roles"
          }, {
            default: le(() => [
              c.value.length ? (m(), v("div", Jk, [
                (m(!0), v(Y, null, we(c.value, ($) => (m(), v("article", {
                  key: $.agentId,
                  class: "provider-card"
                }, [
                  n("header", Qk, [
                    n("div", null, [
                      n("strong", null, o($.agentId), 1),
                      n("p", null, o($.path || a(s).label("没有返回路径信息", "No path information returned")), 1)
                    ]),
                    n("span", Yk, o(a(ge)($.count)), 1)
                  ]),
                  n("div", Zk, [
                    (m(!0), v(Y, null, we($.recent.slice(0, 3), (x) => (m(), v("div", {
                      key: x.id,
                      class: "mini-list__item"
                    }, [
                      n("div", null, [
                        n("strong", null, o(x.modelId), 1),
                        n("p", null, o(x.channel), 1)
                      ]),
                      n("span", {
                        class: _e(["pill", p(x)])
                      }, o(x.status), 3)
                    ]))), 128))
                  ])
                ]))), 128))
              ])) : (m(), v("div", Xk, o(a(s).label("当前没有按角色聚合的会话数据。", "No per-role session summary is available right now.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          X(oe, {
            title: a(s).label("最近活动", "Recent activity"),
            eyebrow: "Timeline"
          }, {
            default: le(() => [
              a(l).data.recentActivity.length ? (m(), v("div", eS, [
                (m(!0), v(Y, null, we(a(l).data.recentActivity.slice(0, 10), ($) => (m(), v("article", {
                  key: $.id,
                  class: "provider-card"
                }, [
                  n("header", tS, [
                    n("div", null, [
                      n("strong", null, o($.title), 1),
                      n("p", null, o(a(st)($.createdAt)), 1)
                    ]),
                    n("span", sS, o($.type), 1)
                  ]),
                  n("p", null, o($.description), 1)
                ]))), 128))
              ])) : (m(), v("div", nS, o(a(s).label("当前还没有最近活动记录。", "There is no recent activity yet.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ]),
        i.value.warnings.length ? (m(), He(oe, {
          key: 1,
          title: a(s).label("运行提醒", "Runtime warnings"),
          eyebrow: "Warning"
        }, {
          default: le(() => [
            n("div", lS, [
              (m(!0), v(Y, null, we(i.value.warnings, ($) => (m(), v("article", {
                key: $,
                class: "risk-row"
              }, [
                n("strong", null, o(a(s).label("注意事项", "Warning")), 1),
                n("span", null, o($), 1)
              ]))), 128))
            ])
          ]),
          _: 1
        }, 8, ["title"])) : ue("", !0),
        i.value.memory ? (m(), He(oe, {
          key: 2,
          title: a(s).label("记忆运行态补充", "Memory runtime details"),
          eyebrow: "Memory"
        }, {
          default: le(() => [
            n("div", aS, [
              n("article", iS, [
                n("p", oS, o(a(s).label("记忆文件", "Memory files")), 1),
                n("strong", null, o(a(ge)(i.value.memory.files)), 1),
                n("span", null, o(a(s).label("当前已接入的记忆文件数量", "Managed memory files detected now")), 1)
              ]),
              n("article", rS, [
                n("p", cS, o(a(s).label("记忆分块", "Chunks")), 1),
                n("strong", null, o(a(ge)(i.value.memory.chunks)), 1),
                n("span", null, o(a(s).label("用于搜索的记忆分块数", "Memory chunks available for search")), 1)
              ]),
              n("article", uS, [
                n("p", dS, o(a(s).label("索引状态", "Index state")), 1),
                n("strong", null, o(i.value.memory.dirty === !0 ? a(s).label("待刷新", "Dirty") : i.value.memory.dirty === !1 ? a(s).label("已同步", "Clean") : "-"), 1),
                n("span", null, o(i.value.memory.dbPath || i.value.memory.workspaceDir || a(s).label("没有返回索引路径", "No index path returned")), 1)
              ]),
              n("article", fS, [
                n("p", pS, o(a(s).label("索引目录", "Index location")), 1),
                n("strong", null, o(i.value.memory.dbPath ? a(s).label("已返回路径", "Path returned") : a(s).label("暂无路径", "No path")), 1),
                n("span", null, o(i.value.memory.dbPath || i.value.memory.workspaceDir || a(s).label("没有返回目录信息", "No directory information returned")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"])) : ue("", !0)
      ], 64)) : ue("", !0)
    ]));
  }
}), gS = { class: "page-stack" }, _S = { class: "page-header" }, mS = { class: "page-header__eyebrow" }, bS = { class: "page-header__title" }, vS = { class: "page-header__description" }, yS = { class: "settings-grid" }, wS = { class: "settings-field" }, $S = { class: "settings-value" }, kS = { class: "settings-field" }, SS = { class: "settings-value" }, CS = { class: "settings-toggle" }, xS = { class: "settings-toggle__copy" }, RS = ["checked"], ES = { class: "settings-note" }, TS = /* @__PURE__ */ Le({
  __name: "SettingsPage",
  setup(e) {
    const t = je();
    return (s, l) => (m(), v("div", gS, [
      n("header", _S, [
        n("div", null, [
          n("p", mS, o(a(t).label("Settings", "Settings")), 1),
          n("h2", bS, o(a(t).label("本地偏好与开发者模式", "Local preferences and developer mode")), 1),
          n("p", vS, o(a(t).label("这些设置只保存在当前浏览器里，不会改服务器，也不会影响其他使用者。", "These preferences stay in the current browser only. They do not change the server and do not affect other users.")), 1)
        ])
      ]),
      X(oe, {
        title: a(t).label("界面偏好", "Interface preferences"),
        eyebrow: "Preferences"
      }, {
        default: le(() => [
          n("div", yS, [
            n("article", wS, [
              n("div", null, [
                n("h3", null, o(a(t).label("主题", "Theme")), 1),
                n("p", null, o(a(t).label("当前控制台主题模式。", "The current theme mode used by the console.")), 1)
              ]),
              n("strong", $S, o(a(t).themePreference === "auto" ? a(t).label("跟随系统", "Auto") : a(t).themePreference === "light" ? a(t).label("浅色", "Light") : a(t).label("深色", "Dark")), 1)
            ]),
            n("article", kS, [
              n("div", null, [
                n("h3", null, o(a(t).label("语言", "Language")), 1),
                n("p", null, o(a(t).label("当前控制台显示语言。", "The display language currently used by the console.")), 1)
              ]),
              n("strong", SS, o(a(t).language === "zh" ? "中文" : "English"), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      X(oe, {
        title: a(t).label("开发者模式", "Developer mode"),
        eyebrow: "Developer"
      }, {
        default: le(() => [
          n("label", CS, [
            n("div", xS, [
              n("strong", null, o(a(t).label("显示调试与原始信息", "Show debug and raw views")), 1),
              n("span", null, o(a(t).label("开启后会显示原始 JSON、诊断区和后续的后台刷新提示，适合排查问题时使用。", "When enabled, the console can reveal raw JSON, diagnostics, and future background refresh hints for troubleshooting.")), 1)
            ]),
            n("input", {
              checked: a(t).developerMode,
              type: "checkbox",
              onChange: l[0] || (l[0] = (i) => a(t).setDeveloperMode(i.target.checked))
            }, null, 40, RS)
          ]),
          n("div", ES, o(a(t).label("默认建议关闭，这样界面更适合普通使用。只有在排障或看原始配置时再打开。", "Keep this off by default for a cleaner operator experience. Turn it on only when you need diagnostics or raw configuration views.")), 1)
        ]),
        _: 1
      }, 8, ["title"])
    ]));
  }
}), AS = Qd({
  history: Ad(),
  routes: [
    { path: "/", name: "overview", component: Sg },
    { path: "/operations", name: "operations", component: Sy },
    { path: "/openclaw", name: "openclaw", component: sy },
    { path: "/channels", name: "channels", component: Sp },
    { path: "/models", name: "models", component: Ab },
    { path: "/security", name: "security", component: nk },
    { path: "/recovery", name: "recovery", component: Z1 },
    { path: "/roles", name: "roles", component: Tw },
    { path: "/files", name: "files", component: lm },
    { path: "/search", name: "search", component: e$ },
    { path: "/sessions", name: "sessions", component: hS },
    { path: "/logs", name: "logs", component: Rm },
    { path: "/notifications", name: "notifications", component: Iv },
    { path: "/cron", name: "cron", component: tg },
    { path: "/settings", name: "settings", component: TS },
    { path: "/ai", redirect: "/models" },
    { path: "/git-sync", redirect: "/recovery" },
    { path: "/memory", redirect: "/files" },
    { path: "/activity", redirect: "/notifications" },
    { path: "/costs", redirect: "/sessions" }
  ]
});
Hc(Cf).use(Kc()).use(AS).mount("#guard-next-app");
