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
const Oe = {}, is = [], xt = () => {
}, Fa = () => !1, an = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), al = (e) => e.startsWith("onUpdate:"), Ke = Object.assign, il = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, vo = Object.prototype.hasOwnProperty, Ae = (e, t) => vo.call(e, t), _e = Array.isArray, os = (e) => Fs(e) === "[object Map]", gs = (e) => Fs(e) === "[object Set]", Ml = (e) => Fs(e) === "[object Date]", ye = (e) => typeof e == "function", Ve = (e) => typeof e == "string", gt = (e) => typeof e == "symbol", Pe = (e) => e !== null && typeof e == "object", Ua = (e) => (Pe(e) || ye(e)) && ye(e.then) && ye(e.catch), Va = Object.prototype.toString, Fs = (e) => Va.call(e), yo = (e) => Fs(e).slice(8, -1), Ga = (e) => Fs(e) === "[object Object]", on = (e) => Ve(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, $s = /* @__PURE__ */ ll(
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
  if (_e(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const l = e[s], i = Ve(l) ? xo(l) : ol(l);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (Ve(e) || Pe(e))
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
function ge(e) {
  let t = "";
  if (Ve(e))
    t = e;
  else if (_e(e))
    for (let s = 0; s < e.length; s++) {
      const l = ge(e[s]);
      l && (t += l + " ");
    }
  else if (Pe(e))
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
  if (s = _e(e), l = _e(t), s || l)
    return s && l ? To(e, t) : !1;
  if (s = Pe(e), l = Pe(t), s || l) {
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
const Wa = (e) => !!(e && e.__v_isRef === !0), o = (e) => Ve(e) ? e : e == null ? "" : _e(e) || Pe(e) && (e.toString === Va || !ye(e.toString)) ? Wa(e) ? o(e.value) : JSON.stringify(e, Ka, 2) : String(e), Ka = (e, t) => Wa(t) ? Ka(e, t.value) : os(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [l, i], r) => (s[xn(l, r) + " =>"] = i, s),
    {}
  )
} : gs(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => xn(s))
} : gt(t) ? xn(t) : Pe(t) && !_e(t) && !Ga(t) ? String(t) : t, xn = (e, t = "") => {
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
    const d = _e(e), h = d && on(s);
    if (d && s === "length") {
      const f = Number(l);
      c.forEach((p, g) => {
        (g === "length" || g === Os || !gt(g) && g >= f) && u(p);
      });
    } else
      switch ((s !== void 0 || c.has(void 0)) && u(c.get(s)), h && u(c.get(Os)), t) {
        case "add":
          d ? h && u(c.get("length")) : (u(c.get(Xt)), os(e) && u(c.get(Gn)));
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
      ...e.map((t) => _e(t) ? ts(t) : t)
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
  let h = s;
  c !== e && (u ? h = function(p, g) {
    return s.call(this, kt(e, p), g, e);
  } : s.length > 2 && (h = function(p, g) {
    return s.call(this, p, g, e);
  }));
  const f = d.call(c, h, l);
  return u && i ? i(f) : f;
}
function Dl(e, t, s, l) {
  const i = dn(e), r = i !== e && !/* @__PURE__ */ ct(e);
  let c = s, u = !1;
  i !== e && (r ? (u = l.length === 0, c = function(h, f, p) {
    return u && (u = !1, h = kt(e, h)), s.call(this, h, kt(e, f), p, e);
  }) : s.length > 3 && (c = function(h, f, p) {
    return s.call(this, h, f, p, e);
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
    const c = _e(t);
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
      return i && Pe(d) ? /* @__PURE__ */ Hn(d) : d;
    }
    return Pe(u) ? i ? /* @__PURE__ */ Hn(u) : /* @__PURE__ */ Ft(u) : u;
  }
}
class ii extends ai {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, l, i) {
    let r = t[s];
    const c = _e(t) && on(s);
    if (!this._isShallow) {
      const h = /* @__PURE__ */ Ut(r);
      if (!/* @__PURE__ */ ct(l) && !/* @__PURE__ */ Ut(l) && (r = /* @__PURE__ */ Ce(r), l = /* @__PURE__ */ Ce(l)), !c && /* @__PURE__ */ Fe(r) && !/* @__PURE__ */ Fe(l))
        return h || (r.value = l), !0;
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
      _e(t) ? "length" : Xt
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
    const i = this.__v_raw, r = /* @__PURE__ */ Ce(i), c = os(r), u = e === "entries" || e === Symbol.iterator && c, d = e === "keys" && c, h = i[e](...l), f = s ? Bn : t ? us : _t;
    return !t && Je(
      r,
      "iterate",
      d ? Gn : Xt
    ), Ke(
      // inheriting all iterator properties
      Object.create(h),
      {
        // iterator protocol
        next() {
          const { value: p, done: g } = h.next();
          return g ? { value: p, done: g } : {
            value: u ? [f(p[0]), f(p[1])] : f(p),
            done: g
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
      const { has: d } = Gs(c), h = t ? Bn : e ? us : _t;
      if (d.call(c, i))
        return h(r.get(i));
      if (d.call(c, u))
        return h(r.get(u));
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
      const c = this, u = c.__v_raw, d = /* @__PURE__ */ Ce(u), h = t ? Bn : e ? us : _t;
      return !e && Je(d, "iterate", Xt), u.forEach((f, p) => i.call(r, h(f), h(p), c));
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
        let h = u.call(c, i);
        h || (i = /* @__PURE__ */ Ce(i), h = u.call(c, i));
        const f = d.call(c, i);
        return c.set(i, r), h ? Ct(r, f) && Mt(c, "set", i, r) : Mt(c, "add", i, r), this;
      },
      delete(i) {
        const r = /* @__PURE__ */ Ce(this), { has: c, get: u } = Gs(r);
        let d = c.call(r, i);
        d || (i = /* @__PURE__ */ Ce(i), d = c.call(r, i)), u && u.call(r, i);
        const h = r.delete(i);
        return d && Mt(r, "delete", i, void 0), h;
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
  if (!Pe(e) || e.__v_raw && !(t && e.__v_isReactive))
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
const _t = (e) => Pe(e) ? /* @__PURE__ */ Ft(e) : e, us = (e) => Pe(e) ? /* @__PURE__ */ Hn(e) : e;
// @__NO_SIDE_EFFECTS__
function Fe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function B(e) {
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
  const t = _e(e) ? new Array(e.length) : {};
  for (const s in e)
    t[s] = fi(e, s);
  return t;
}
class er {
  constructor(t, s, l) {
    this._object = t, this._key = s, this._defaultValue = l, this.__v_isRef = !0, this._value = void 0, this._raw = /* @__PURE__ */ Ce(t);
    let i = !0, r = t;
    if (!_e(t) || !on(String(s)))
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
  return /* @__PURE__ */ Fe(e) ? e : ye(e) ? new tr(e) : Pe(e) && arguments.length > 1 ? fi(e, t, s) : /* @__PURE__ */ B(e);
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
function ir(e, t, s = Oe) {
  const { immediate: l, deep: i, once: r, scheduler: c, augmentJob: u, call: d } = s, h = (j) => i ? j : /* @__PURE__ */ ct(j) || i === !1 || i === 0 ? It(j, 1) : It(j);
  let f, p, g, _, w = !1, x = !1;
  if (/* @__PURE__ */ Fe(e) ? (p = () => e.value, w = /* @__PURE__ */ ct(e)) : /* @__PURE__ */ Rt(e) ? (p = () => h(e), w = !0) : _e(e) ? (x = !0, w = e.some((j) => /* @__PURE__ */ Rt(j) || /* @__PURE__ */ ct(j)), p = () => e.map((j) => {
    if (/* @__PURE__ */ Fe(j))
      return j.value;
    if (/* @__PURE__ */ Rt(j))
      return h(j);
    if (ye(j))
      return d ? d(j, 2) : j();
  })) : ye(e) ? t ? p = d ? () => d(e, 2) : e : p = () => {
    if (g) {
      Dt();
      try {
        g();
      } finally {
        Lt();
      }
    }
    const j = Yt;
    Yt = f;
    try {
      return d ? d(e, 3, [_]) : e(_);
    } finally {
      Yt = j;
    }
  } : p = xt, t && i) {
    const j = p, te = i === !0 ? 1 / 0 : i;
    p = () => It(j(), te);
  }
  const H = Ja(), O = () => {
    f.stop(), H && H.active && il(H.effects, f);
  };
  if (r && t) {
    const j = t;
    t = (...te) => {
      j(...te), O();
    };
  }
  let M = x ? new Array(e.length).fill(Hs) : Hs;
  const I = (j) => {
    if (!(!(f.flags & 1) || !f.dirty && !j))
      if (t) {
        const te = f.run();
        if (i || w || (x ? te.some((J, A) => Ct(J, M[A])) : Ct(te, M))) {
          g && g();
          const J = Yt;
          Yt = f;
          try {
            const A = [
              te,
              // pass undefined as the old value when it's changed for the first time
              M === Hs ? void 0 : x && M[0] === Hs ? [] : M,
              _
            ];
            M = te, d ? d(t, 3, A) : (
              // @ts-expect-error
              t(...A)
            );
          } finally {
            Yt = J;
          }
        }
      } else
        f.run();
  };
  return u && u(I), f = new Qa(p), f.scheduler = c ? () => c(I, !1) : I, _ = (j) => ar(j, !1, f), g = f.onStop = () => {
    const j = Ys.get(f);
    if (j) {
      if (d)
        d(j, 4);
      else
        for (const te of j) te();
      Ys.delete(f);
    }
  }, t ? l ? I(!0) : M = f.run() : c ? c(I.bind(null, !0), !0) : f.run(), O.pause = f.pause.bind(f), O.resume = f.resume.bind(f), O.stop = O, O;
}
function It(e, t = 1 / 0, s) {
  if (t <= 0 || !Pe(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ Fe(e))
    It(e.value, t, s);
  else if (_e(e))
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
  if (_e(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(Et(e[r], t, s, l));
    return i;
  }
}
function pn(e, t, s, l = !0) {
  const i = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: c } = t && t.appContext.config || Oe;
  if (t) {
    let u = t.parent;
    const d = t.proxy, h = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; u; ) {
      const f = u.ec;
      if (f) {
        for (let p = 0; p < f.length; p++)
          if (f[p](e, d, h) === !1)
            return;
      }
      u = u.parent;
    }
    if (r) {
      Dt(), Us(r, null, 10, [
        e,
        d,
        h
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
  _e(e) ? rs.push(...e) : jt && e.id === -1 ? jt.splice(ns + 1, 0, e) : e.flags & 1 || (rs.push(e), e.flags |= 1), hi();
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
    let [r, c, u, d = Oe] = t[i];
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
function Me(e, t, s) {
  return bi(e, t, s);
}
function bi(e, t, s = Oe) {
  const { immediate: l, deep: i, flush: r, once: c } = s, u = Ke({}, s), d = t && l || !t && r !== "post";
  let h;
  if (Ds) {
    if (r === "sync") {
      const _ = fr();
      h = _.__watcherHandles || (_.__watcherHandles = []);
    } else if (!d) {
      const _ = () => {
      };
      return _.stop = xt, _.resume = xt, _.pause = xt, _;
    }
  }
  const f = tt;
  u.call = (_, w, x) => Et(_, f, w, x);
  let p = !1;
  r === "post" ? u.scheduler = (_) => {
    lt(_, f && f.suspense);
  } : r !== "sync" && (p = !0, u.scheduler = (_, w) => {
    w ? _() : ml(_);
  }), u.augmentJob = (_) => {
    t && (_.flags |= 4), p && (_.flags |= 2, f && (_.id = f.uid, _.i = f));
  };
  const g = ir(e, t, u);
  return Ds && (h ? h.push(g) : d && g()), g;
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
  if (_e(e)) {
    e.forEach(
      (x, H) => Cs(
        x,
        t && (_e(t) ? t[H] : t),
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
  const r = l.shapeFlag & 4 ? bn(l.component) : l.el, c = i ? null : r, { i: u, r: d } = e, h = t && t.r, f = u.refs === Oe ? u.refs = {} : u.refs, p = u.setupState, g = /* @__PURE__ */ Ce(p), _ = p === Oe ? Fa : (x) => Fl(f, x) ? !1 : Ae(g, x), w = (x, H) => !(H && Fl(f, H));
  if (h != null && h !== d) {
    if (Ul(t), Ve(h))
      f[h] = null, _(h) && (p[h] = null);
    else if (/* @__PURE__ */ Fe(h)) {
      const x = t;
      w(h, x.k) && (h.value = null), x.k && (f[x.k] = null);
    }
  }
  if (ye(d))
    Us(d, u, 12, [c, f]);
  else {
    const x = Ve(d), H = /* @__PURE__ */ Fe(d);
    if (x || H) {
      const O = () => {
        if (e.f) {
          const M = x ? _(d) ? p[d] : f[d] : w() || !e.k ? d.value : f[e.k];
          if (i)
            _e(M) && il(M, r);
          else if (_e(M))
            M.includes(r) || M.push(r);
          else if (x)
            f[d] = [r], _(d) && (p[d] = f[d]);
          else {
            const I = [r];
            w(d, e.k) && (d.value = I), e.k && (f[e.k] = I);
          }
        } else x ? (f[d] = c, _(d) && (p[d] = c)) : H && (w(d, e.k) && (d.value = c), e.k && (f[e.k] = c));
      };
      if (c) {
        const M = () => {
          O(), en.delete(e);
        };
        M.id = -1, en.set(e, M), lt(M, s);
      } else
        Ul(e), O();
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
  const r = s, c = _e(e);
  if (c || Ve(e)) {
    const u = c && /* @__PURE__ */ Rt(e);
    let d = !1, h = !1;
    u && (d = !/* @__PURE__ */ ct(e), h = /* @__PURE__ */ Ut(e), e = dn(e)), i = new Array(e.length);
    for (let f = 0, p = e.length; f < p; f++)
      i[f] = t(
        d ? h ? us(_t(e[f])) : _t(e[f]) : e[f],
        f,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let u = 0; u < e; u++)
      i[u] = t(u + 1, u, void 0, r);
  } else if (Pe(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (u, d) => t(u, d, void 0, r)
      );
    else {
      const u = Object.keys(e);
      i = new Array(u.length);
      for (let d = 0, h = u.length; d < h; d++) {
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
    const h = Object.keys(s).length > 0;
    return t !== "default" && (s.name = t), m(), He(
      Y,
      null,
      [Z("slot", s, l)],
      h ? -2 : 64
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
), An = (e, t) => e !== Oe && !e.__isScriptSetup && Ae(e, t), Er = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: l, data: i, props: r, accessCache: c, type: u, appContext: d } = e;
    if (t[0] !== "$") {
      const g = c[t];
      if (g !== void 0)
        switch (g) {
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
        if (i !== Oe && Ae(i, t))
          return c[t] = 2, i[t];
        if (Ae(r, t))
          return c[t] = 3, r[t];
        if (s !== Oe && Ae(s, t))
          return c[t] = 4, s[t];
        Wn && (c[t] = 0);
      }
    }
    const h = xs[t];
    let f, p;
    if (h)
      return t === "$attrs" && Je(e.attrs, "get", ""), h(e);
    if (
      // css module (injected by vue-loader)
      (f = u.__cssModules) && (f = f[t])
    )
      return f;
    if (s !== Oe && Ae(s, t))
      return c[t] = 4, s[t];
    if (
      // global properties
      p = d.config.globalProperties, Ae(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, s) {
    const { data: l, setupState: i, ctx: r } = e;
    return An(i, t) ? (i[t] = s, !0) : l !== Oe && Ae(l, t) ? (l[t] = s, !0) : Ae(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: l, appContext: i, props: r, type: c }
  }, u) {
    let d;
    return !!(s[u] || e !== Oe && u[0] !== "$" && Ae(e, u) || An(t, u) || Ae(r, u) || Ae(l, u) || Ae(xs, u) || Ae(i.config.globalProperties, u) || (d = c.__cssModules) && d[u]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : Ae(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Gl(e) {
  return _e(e) ? e.reduce(
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
    inject: h,
    // lifecycle
    created: f,
    beforeMount: p,
    mounted: g,
    beforeUpdate: _,
    updated: w,
    activated: x,
    deactivated: H,
    beforeDestroy: O,
    beforeUnmount: M,
    destroyed: I,
    unmounted: j,
    render: te,
    renderTracked: J,
    renderTriggered: A,
    errorCaptured: $,
    serverPrefetch: C,
    // public API
    expose: T,
    inheritAttrs: ce,
    // assets
    components: re,
    directives: me,
    filters: Re
  } = t;
  if (h && Ar(h, l, null), c)
    for (const k in c) {
      const P = c[k];
      ye(P) && (l[k] = P.bind(s));
    }
  if (i) {
    const k = i.call(s, s);
    Pe(k) && (e.data = /* @__PURE__ */ Ft(k));
  }
  if (Wn = !0, r)
    for (const k in r) {
      const P = r[k], be = ye(P) ? P.bind(s, s) : ye(P.get) ? P.get.bind(s, s) : xt, fe = !ye(P) && ye(P.set) ? P.set.bind(s) : xt, W = K({
        get: be,
        set: fe
      });
      Object.defineProperty(l, k, {
        enumerable: !0,
        configurable: !0,
        get: () => W.value,
        set: (z) => W.value = z
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
  function V(k, P) {
    _e(P) ? P.forEach((be) => k(be.bind(s))) : P && k(P.bind(s));
  }
  if (V(yr, p), V(ze, g), V(wr, _), V($r, w), V(mr, x), V(br, H), V(xr, $), V(Cr, J), V(Sr, A), V(ki, M), V(Si, j), V(kr, C), _e(T))
    if (T.length) {
      const k = e.exposed || (e.exposed = {});
      T.forEach((P) => {
        Object.defineProperty(k, P, {
          get: () => s[P],
          set: (be) => s[P] = be,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  te && e.render === xt && (e.render = te), ce != null && (e.inheritAttrs = ce), re && (e.components = re), me && (e.directives = me), C && yi(e);
}
function Ar(e, t, s = xt) {
  _e(e) && (e = Kn(e));
  for (const l in e) {
    const i = e[l];
    let r;
    Pe(i) ? "default" in i ? r = ut(
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
    _e(e) ? e.map((l) => l.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function xi(e, t, s, l) {
  let i = l.includes(".") ? vi(s, l) : () => s[l];
  if (Ve(e)) {
    const r = t[e];
    ye(r) && Me(i, r);
  } else if (ye(e))
    Me(i, e.bind(s));
  else if (Pe(e))
    if (_e(e))
      e.forEach((r) => xi(r, t, s, l));
    else {
      const r = ye(e.handler) ? e.handler.bind(s) : t[e.handler];
      ye(r) && Me(i, r, e);
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
    (h) => tn(d, h, c, !0)
  ), tn(d, t, c)), Pe(t) && r.set(t, d), d;
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
  if (_e(e)) {
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
  return e ? _e(e) && _e(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ke(
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
    ye(l) || (l = Ke({}, l)), i != null && !Pe(i) && (i = null);
    const r = Ei(), c = /* @__PURE__ */ new WeakSet(), u = [];
    let d = !1;
    const h = r.app = {
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
        return c.has(f) || (f && ye(f.install) ? (c.add(f), f.install(h, ...p)) : ye(f) && (c.add(f), f(h, ...p))), h;
      },
      mixin(f) {
        return r.mixins.includes(f) || r.mixins.push(f), h;
      },
      component(f, p) {
        return p ? (r.components[f] = p, h) : r.components[f];
      },
      directive(f, p) {
        return p ? (r.directives[f] = p, h) : r.directives[f];
      },
      mount(f, p, g) {
        if (!d) {
          const _ = h._ceVNode || Z(l, i);
          return _.appContext = r, g === !0 ? g = "svg" : g === !1 && (g = void 0), e(_, f, g), d = !0, h._container = f, f.__vue_app__ = h, bn(_.component);
        }
      },
      onUnmount(f) {
        u.push(f);
      },
      unmount() {
        d && (Et(
          u,
          h._instance,
          16
        ), e(null, h._container), delete h._container.__vue_app__);
      },
      provide(f, p) {
        return r.provides[f] = p, h;
      },
      runWithContext(f) {
        const p = es;
        es = h;
        try {
          return f();
        } finally {
          es = p;
        }
      }
    };
    return h;
  };
}
let es = null;
const Dr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${pt(t)}Modifiers`] || e[`${qt(t)}Modifiers`];
function Lr(e, t, ...s) {
  if (e.isUnmounted) return;
  const l = e.vnode.props || Oe;
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
  const h = l[u + "Once"];
  if (h) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[u])
      return;
    e.emitted[u] = !0, Et(
      h,
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
    const d = (h) => {
      const f = Ti(h, t, !0);
      f && (u = !0, Ke(c, f));
    };
    !s && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  return !r && !u ? (Pe(e) && l.set(e, null), null) : (_e(r) ? r.forEach((d) => c[d] = null) : Ke(c, r), Pe(e) && l.set(e, c), c);
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
    render: h,
    renderCache: f,
    props: p,
    data: g,
    setupState: _,
    ctx: w,
    inheritAttrs: x
  } = e, H = Xs(e);
  let O, M;
  try {
    if (s.shapeFlag & 4) {
      const j = i || l, te = j;
      O = St(
        h.call(
          te,
          j,
          f,
          p,
          _,
          g,
          w
        )
      ), M = u;
    } else {
      const j = t;
      O = St(
        j.length > 1 ? j(
          p,
          { attrs: u, slots: c, emit: d }
        ) : j(
          p,
          null
        )
      ), M = t.props ? u : Ur(u);
    }
  } catch (j) {
    Rs.length = 0, pn(j, e, 1), O = Z(Vt);
  }
  let I = O;
  if (M && x !== !1) {
    const j = Object.keys(M), { shapeFlag: te } = I;
    j.length && te & 7 && (r && j.some(al) && (M = Vr(
      M,
      r
    )), I = ds(I, M, !1, !0));
  }
  return s.dirs && (I = ds(I, null, !1, !0), I.dirs = I.dirs ? I.dirs.concat(s.dirs) : s.dirs), s.transition && bl(I, s.transition), O = I, Xs(H), O;
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
  const { props: l, children: i, component: r } = e, { props: c, children: u, patchFlag: d } = t, h = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && d >= 0) {
    if (d & 1024)
      return !0;
    if (d & 16)
      return l ? Kl(l, c, h) : !!c;
    if (d & 8) {
      const f = t.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        const g = f[p];
        if (Ai(c, l, g) && !_n(h, g))
          return !0;
      }
    }
  } else
    return (i || u) && (!u || !u.$stable) ? !0 : l === c ? !1 : l ? c ? Kl(l, c, h) : !0 : !!c;
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
  return s === "style" && Pe(l) && Pe(i) ? !Kt(l, i) : l !== i;
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
  let h = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (l || c > 0) && !(c & 16)
  ) {
    if (c & 8) {
      const f = e.vnode.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        let g = f[p];
        if (_n(e.emitsOptions, g))
          continue;
        const _ = t[g];
        if (d)
          if (Ae(r, g))
            _ !== r[g] && (r[g] = _, h = !0);
          else {
            const w = pt(g);
            i[w] = zn(
              d,
              u,
              w,
              _,
              e,
              !1
            );
          }
        else
          _ !== r[g] && (r[g] = _, h = !0);
      }
    }
  } else {
    Ii(e, t, i, r) && (h = !0);
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
        (!t || !Ae(t, p)) && (delete r[p], h = !0);
  }
  h && Mt(e.attrs, "set", "");
}
function Ii(e, t, s, l) {
  const [i, r] = e.propsOptions;
  let c = !1, u;
  if (t)
    for (let d in t) {
      if ($s(d))
        continue;
      const h = t[d];
      let f;
      i && Ae(i, f = pt(d)) ? !r || !r.includes(f) ? s[f] = h : (u || (u = {}))[f] = h : _n(e.emitsOptions, d) || (!(d in l) || h !== l[d]) && (l[d] = h, c = !0);
    }
  if (r) {
    const d = /* @__PURE__ */ Ce(s), h = u || Oe;
    for (let f = 0; f < r.length; f++) {
      const p = r[f];
      s[p] = zn(
        i,
        d,
        p,
        h[p],
        e,
        !Ae(h, p)
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
        const { propsDefaults: h } = i;
        if (s in h)
          l = h[s];
        else {
          const f = Vs(i);
          l = h[s] = d.call(
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
      const [g, _] = Ni(p, t, !0);
      Ke(c, g), _ && u.push(..._);
    };
    !s && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!r && !d)
    return Pe(e) && l.set(e, is), is;
  if (_e(r))
    for (let f = 0; f < r.length; f++) {
      const p = pt(r[f]);
      zl(p) && (c[p] = Oe);
    }
  else if (r)
    for (const f in r) {
      const p = pt(f);
      if (zl(p)) {
        const g = r[f], _ = c[p] = _e(g) || ye(g) ? { type: g } : Ke({}, g), w = _.type;
        let x = !1, H = !0;
        if (_e(w))
          for (let O = 0; O < w.length; ++O) {
            const M = w[O], I = ye(M) && M.name;
            if (I === "Boolean") {
              x = !0;
              break;
            } else I === "String" && (H = !1);
          }
        else
          x = ye(w) && w.name === "Boolean";
        _[
          0
          /* shouldCast */
        ] = x, _[
          1
          /* shouldCastTrue */
        ] = H, (x || Ae(_, "default")) && u.push(p);
      }
    }
  const h = [c, u];
  return Pe(e) && l.set(e, h), h;
}
function zl(e) {
  return e[0] !== "$" && !$s(e);
}
const vl = (e) => e === "_" || e === "_ctx" || e === "$stable", yl = (e) => _e(e) ? e.map(St) : [St(e)], Kr = (e, t, s) => {
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
  let r = !0, c = Oe;
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
    setText: h,
    setElementText: f,
    parentNode: p,
    nextSibling: g,
    setScopeId: _ = xt,
    insertStaticContent: w
  } = e, x = (b, y, S, D = null, U = null, L = null, X = void 0, Q = null, q = !!y.dynamicChildren) => {
    if (b === y)
      return;
    b && !vs(b, y) && (D = N(b), z(b, U, L, !0), b = null), y.patchFlag === -2 && (q = !1, y.dynamicChildren = null);
    const { type: G, ref: pe, shapeFlag: se } = y;
    switch (G) {
      case mn:
        H(b, y, S, D);
        break;
      case Vt:
        O(b, y, S, D);
        break;
      case On:
        b == null && M(y, S, D, X);
        break;
      case Y:
        re(
          b,
          y,
          S,
          D,
          U,
          L,
          X,
          Q,
          q
        );
        break;
      default:
        se & 1 ? te(
          b,
          y,
          S,
          D,
          U,
          L,
          X,
          Q,
          q
        ) : se & 6 ? me(
          b,
          y,
          S,
          D,
          U,
          L,
          X,
          Q,
          q
        ) : (se & 64 || se & 128) && G.process(
          b,
          y,
          S,
          D,
          U,
          L,
          X,
          Q,
          q,
          de
        );
    }
    pe != null && U ? Cs(pe, b && b.ref, L, y || b, !y) : pe == null && b && b.ref != null && Cs(b.ref, null, L, b, !0);
  }, H = (b, y, S, D) => {
    if (b == null)
      l(
        y.el = u(y.children),
        S,
        D
      );
    else {
      const U = y.el = b.el;
      y.children !== b.children && h(U, y.children);
    }
  }, O = (b, y, S, D) => {
    b == null ? l(
      y.el = d(y.children || ""),
      S,
      D
    ) : y.el = b.el;
  }, M = (b, y, S, D) => {
    [b.el, b.anchor] = w(
      b.children,
      y,
      S,
      D,
      b.el,
      b.anchor
    );
  }, I = ({ el: b, anchor: y }, S, D) => {
    let U;
    for (; b && b !== y; )
      U = g(b), l(b, S, D), b = U;
    l(y, S, D);
  }, j = ({ el: b, anchor: y }) => {
    let S;
    for (; b && b !== y; )
      S = g(b), i(b), b = S;
    i(y);
  }, te = (b, y, S, D, U, L, X, Q, q) => {
    if (y.type === "svg" ? X = "svg" : y.type === "math" && (X = "mathml"), b == null)
      J(
        y,
        S,
        D,
        U,
        L,
        X,
        Q,
        q
      );
    else {
      const G = b.el && b.el._isVueCE ? b.el : null;
      try {
        G && G._beginPatch(), C(
          b,
          y,
          U,
          L,
          X,
          Q,
          q
        );
      } finally {
        G && G._endPatch();
      }
    }
  }, J = (b, y, S, D, U, L, X, Q) => {
    let q, G;
    const { props: pe, shapeFlag: se, transition: R, dirs: F } = b;
    if (q = b.el = c(
      b.type,
      L,
      pe && pe.is,
      pe
    ), se & 8 ? f(q, b.children) : se & 16 && $(
      b.children,
      q,
      null,
      D,
      U,
      Pn(b, L),
      X,
      Q
    ), F && Jt(b, null, D, "created"), A(q, b, b.scopeId, X, D), pe) {
      for (const ne in pe)
        ne !== "value" && !$s(ne) && r(q, ne, null, pe[ne], L, D);
      "value" in pe && r(q, "value", null, pe.value, L), (G = pe.onVnodeBeforeMount) && wt(G, D, b);
    }
    F && Jt(b, null, D, "beforeMount");
    const E = Yr(U, R);
    E && R.beforeEnter(q), l(q, y, S), ((G = pe && pe.onVnodeMounted) || E || F) && lt(() => {
      G && wt(G, D, b), E && R.enter(q), F && Jt(b, null, D, "mounted");
    }, U);
  }, A = (b, y, S, D, U) => {
    if (S && _(b, S), D)
      for (let L = 0; L < D.length; L++)
        _(b, D[L]);
    if (U) {
      let L = U.subTree;
      if (y === L || Bi(L.type) && (L.ssContent === y || L.ssFallback === y)) {
        const X = U.vnode;
        A(
          b,
          X,
          X.scopeId,
          X.slotScopeIds,
          U.parent
        );
      }
    }
  }, $ = (b, y, S, D, U, L, X, Q, q = 0) => {
    for (let G = q; G < b.length; G++) {
      const pe = b[G] = Q ? Ot(b[G]) : St(b[G]);
      x(
        null,
        pe,
        y,
        S,
        D,
        U,
        L,
        X,
        Q
      );
    }
  }, C = (b, y, S, D, U, L, X) => {
    const Q = y.el = b.el;
    let { patchFlag: q, dynamicChildren: G, dirs: pe } = y;
    q |= b.patchFlag & 16;
    const se = b.props || Oe, R = y.props || Oe;
    let F;
    if (S && Qt(S, !1), (F = R.onVnodeBeforeUpdate) && wt(F, S, y, b), pe && Jt(y, b, S, "beforeUpdate"), S && Qt(S, !0), (se.innerHTML && R.innerHTML == null || se.textContent && R.textContent == null) && f(Q, ""), G ? T(
      b.dynamicChildren,
      G,
      Q,
      S,
      D,
      Pn(y, U),
      L
    ) : X || P(
      b,
      y,
      Q,
      null,
      S,
      D,
      Pn(y, U),
      L,
      !1
    ), q > 0) {
      if (q & 16)
        ce(Q, se, R, S, U);
      else if (q & 2 && se.class !== R.class && r(Q, "class", null, R.class, U), q & 4 && r(Q, "style", se.style, R.style, U), q & 8) {
        const E = y.dynamicProps;
        for (let ne = 0; ne < E.length; ne++) {
          const ve = E[ne], Ye = se[ve], nt = R[ve];
          (nt !== Ye || ve === "value") && r(Q, ve, Ye, nt, U, S);
        }
      }
      q & 1 && b.children !== y.children && f(Q, y.children);
    } else !X && G == null && ce(Q, se, R, S, U);
    ((F = R.onVnodeUpdated) || pe) && lt(() => {
      F && wt(F, S, y, b), pe && Jt(y, b, S, "updated");
    }, D);
  }, T = (b, y, S, D, U, L, X) => {
    for (let Q = 0; Q < y.length; Q++) {
      const q = b[Q], G = y[Q], pe = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        q.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (q.type === Y || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !vs(q, G) || // - In the case of a component, it could contain anything.
        q.shapeFlag & 198) ? p(q.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          S
        )
      );
      x(
        q,
        G,
        pe,
        null,
        D,
        U,
        L,
        X,
        !0
      );
    }
  }, ce = (b, y, S, D, U) => {
    if (y !== S) {
      if (y !== Oe)
        for (const L in y)
          !$s(L) && !(L in S) && r(
            b,
            L,
            y[L],
            null,
            U,
            D
          );
      for (const L in S) {
        if ($s(L)) continue;
        const X = S[L], Q = y[L];
        X !== Q && L !== "value" && r(b, L, Q, X, U, D);
      }
      "value" in S && r(b, "value", y.value, S.value, U);
    }
  }, re = (b, y, S, D, U, L, X, Q, q) => {
    const G = y.el = b ? b.el : u(""), pe = y.anchor = b ? b.anchor : u("");
    let { patchFlag: se, dynamicChildren: R, slotScopeIds: F } = y;
    F && (Q = Q ? Q.concat(F) : F), b == null ? (l(G, S, D), l(pe, S, D), $(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      y.children || [],
      S,
      pe,
      U,
      L,
      X,
      Q,
      q
    )) : se > 0 && se & 64 && R && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    b.dynamicChildren && b.dynamicChildren.length === R.length ? (T(
      b.dynamicChildren,
      R,
      S,
      U,
      L,
      X,
      Q
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (y.key != null || U && y === U.subTree) && Ui(
      b,
      y,
      !0
      /* shallow */
    )) : P(
      b,
      y,
      S,
      pe,
      U,
      L,
      X,
      Q,
      q
    );
  }, me = (b, y, S, D, U, L, X, Q, q) => {
    y.slotScopeIds = Q, b == null ? y.shapeFlag & 512 ? U.ctx.activate(
      y,
      S,
      D,
      X,
      q
    ) : Re(
      y,
      S,
      D,
      U,
      L,
      X,
      q
    ) : Ee(b, y, q);
  }, Re = (b, y, S, D, U, L, X) => {
    const Q = b.component = ic(
      b,
      D,
      U
    );
    if (wi(b) && (Q.ctx.renderer = de), oc(Q, !1, X), Q.asyncDep) {
      if (U && U.registerDep(Q, V, X), !b.el) {
        const q = Q.subTree = Z(Vt);
        O(null, q, y, S), b.placeholder = q.el;
      }
    } else
      V(
        Q,
        b,
        y,
        S,
        U,
        L,
        X
      );
  }, Ee = (b, y, S) => {
    const D = y.component = b.component;
    if (Gr(b, y, S))
      if (D.asyncDep && !D.asyncResolved) {
        k(D, y, S);
        return;
      } else
        D.next = y, D.update();
    else
      y.el = b.el, D.vnode = y;
  }, V = (b, y, S, D, U, L, X) => {
    const Q = () => {
      if (b.isMounted) {
        let { next: se, bu: R, u: F, parent: E, vnode: ne } = b;
        {
          const vt = Vi(b);
          if (vt) {
            se && (se.el = ne.el, k(b, se, X)), vt.asyncDep.then(() => {
              lt(() => {
                b.isUnmounted || G();
              }, U);
            });
            return;
          }
        }
        let ve = se, Ye;
        Qt(b, !1), se ? (se.el = ne.el, k(b, se, X)) : se = ne, R && Ks(R), (Ye = se.props && se.props.onVnodeBeforeUpdate) && wt(Ye, E, se, ne), Qt(b, !0);
        const nt = Wl(b), bt = b.subTree;
        b.subTree = nt, x(
          bt,
          nt,
          // parent may have changed if it's in a teleport
          p(bt.el),
          // anchor may have changed if it's in a fragment
          N(bt),
          b,
          U,
          L
        ), se.el = nt.el, ve === null && Br(b, nt.el), F && lt(F, U), (Ye = se.props && se.props.onVnodeUpdated) && lt(
          () => wt(Ye, E, se, ne),
          U
        );
      } else {
        let se;
        const { el: R, props: F } = y, { bm: E, m: ne, parent: ve, root: Ye, type: nt } = b, bt = cs(y);
        Qt(b, !1), E && Ks(E), !bt && (se = F && F.onVnodeBeforeMount) && wt(se, ve, y), Qt(b, !0);
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
            D,
            b,
            U,
            L
          ), y.el = vt.el;
        }
        if (ne && lt(ne, U), !bt && (se = F && F.onVnodeMounted)) {
          const vt = y;
          lt(
            () => wt(se, ve, vt),
            U
          );
        }
        (y.shapeFlag & 256 || ve && cs(ve.vnode) && ve.vnode.shapeFlag & 256) && b.a && lt(b.a, U), b.isMounted = !0, y = S = D = null;
      }
    };
    b.scope.on();
    const q = b.effect = new Qa(Q);
    b.scope.off();
    const G = b.update = q.run.bind(q), pe = b.job = q.runIfDirty.bind(q);
    pe.i = b, pe.id = b.uid, q.scheduler = () => ml(pe), Qt(b, !0), G();
  }, k = (b, y, S) => {
    y.component = b;
    const D = b.vnode.props;
    b.vnode = y, b.next = null, jr(b, y.props, D, S), qr(b, y.children, S), Dt(), Ll(b), Lt();
  }, P = (b, y, S, D, U, L, X, Q, q = !1) => {
    const G = b && b.children, pe = b ? b.shapeFlag : 0, se = y.children, { patchFlag: R, shapeFlag: F } = y;
    if (R > 0) {
      if (R & 128) {
        fe(
          G,
          se,
          S,
          D,
          U,
          L,
          X,
          Q,
          q
        );
        return;
      } else if (R & 256) {
        be(
          G,
          se,
          S,
          D,
          U,
          L,
          X,
          Q,
          q
        );
        return;
      }
    }
    F & 8 ? (pe & 16 && We(G, U, L), se !== G && f(S, se)) : pe & 16 ? F & 16 ? fe(
      G,
      se,
      S,
      D,
      U,
      L,
      X,
      Q,
      q
    ) : We(G, U, L, !0) : (pe & 8 && f(S, ""), F & 16 && $(
      se,
      S,
      D,
      U,
      L,
      X,
      Q,
      q
    ));
  }, be = (b, y, S, D, U, L, X, Q, q) => {
    b = b || is, y = y || is;
    const G = b.length, pe = y.length, se = Math.min(G, pe);
    let R;
    for (R = 0; R < se; R++) {
      const F = y[R] = q ? Ot(y[R]) : St(y[R]);
      x(
        b[R],
        F,
        S,
        null,
        U,
        L,
        X,
        Q,
        q
      );
    }
    G > pe ? We(
      b,
      U,
      L,
      !0,
      !1,
      se
    ) : $(
      y,
      S,
      D,
      U,
      L,
      X,
      Q,
      q,
      se
    );
  }, fe = (b, y, S, D, U, L, X, Q, q) => {
    let G = 0;
    const pe = y.length;
    let se = b.length - 1, R = pe - 1;
    for (; G <= se && G <= R; ) {
      const F = b[G], E = y[G] = q ? Ot(y[G]) : St(y[G]);
      if (vs(F, E))
        x(
          F,
          E,
          S,
          null,
          U,
          L,
          X,
          Q,
          q
        );
      else
        break;
      G++;
    }
    for (; G <= se && G <= R; ) {
      const F = b[se], E = y[R] = q ? Ot(y[R]) : St(y[R]);
      if (vs(F, E))
        x(
          F,
          E,
          S,
          null,
          U,
          L,
          X,
          Q,
          q
        );
      else
        break;
      se--, R--;
    }
    if (G > se) {
      if (G <= R) {
        const F = R + 1, E = F < pe ? y[F].el : D;
        for (; G <= R; )
          x(
            null,
            y[G] = q ? Ot(y[G]) : St(y[G]),
            S,
            E,
            U,
            L,
            X,
            Q,
            q
          ), G++;
      }
    } else if (G > R)
      for (; G <= se; )
        z(b[G], U, L, !0), G++;
    else {
      const F = G, E = G, ne = /* @__PURE__ */ new Map();
      for (G = E; G <= R; G++) {
        const ot = y[G] = q ? Ot(y[G]) : St(y[G]);
        ot.key != null && ne.set(ot.key, G);
      }
      let ve, Ye = 0;
      const nt = R - E + 1;
      let bt = !1, vt = 0;
      const ms = new Array(nt);
      for (G = 0; G < nt; G++) ms[G] = 0;
      for (G = F; G <= se; G++) {
        const ot = b[G];
        if (Ye >= nt) {
          z(ot, U, L, !0);
          continue;
        }
        let yt;
        if (ot.key != null)
          yt = ne.get(ot.key);
        else
          for (ve = E; ve <= R; ve++)
            if (ms[ve - E] === 0 && vs(ot, y[ve])) {
              yt = ve;
              break;
            }
        yt === void 0 ? z(ot, U, L, !0) : (ms[yt - E] = G + 1, yt >= vt ? vt = yt : bt = !0, x(
          ot,
          y[yt],
          S,
          null,
          U,
          L,
          X,
          Q,
          q
        ), Ye++);
      }
      const Al = bt ? Zr(ms) : is;
      for (ve = Al.length - 1, G = nt - 1; G >= 0; G--) {
        const ot = E + G, yt = y[ot], Pl = y[ot + 1], Ol = ot + 1 < pe ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Pl.el || Gi(Pl)
        ) : D;
        ms[G] === 0 ? x(
          null,
          yt,
          S,
          Ol,
          U,
          L,
          X,
          Q,
          q
        ) : bt && (ve < 0 || G !== Al[ve] ? W(yt, S, Ol, 2) : ve--);
      }
    }
  }, W = (b, y, S, D, U = null) => {
    const { el: L, type: X, transition: Q, children: q, shapeFlag: G } = b;
    if (G & 6) {
      W(b.component.subTree, y, S, D);
      return;
    }
    if (G & 128) {
      b.suspense.move(y, S, D);
      return;
    }
    if (G & 64) {
      X.move(b, y, S, de);
      return;
    }
    if (X === Y) {
      l(L, y, S);
      for (let se = 0; se < q.length; se++)
        W(q[se], y, S, D);
      l(b.anchor, y, S);
      return;
    }
    if (X === On) {
      I(b, y, S);
      return;
    }
    if (D !== 2 && G & 1 && Q)
      if (D === 0)
        Q.beforeEnter(L), l(L, y, S), lt(() => Q.enter(L), U);
      else {
        const { leave: se, delayLeave: R, afterLeave: F } = Q, E = () => {
          b.ctx.isUnmounted ? i(L) : l(L, y, S);
        }, ne = () => {
          L._isLeaving && L[_r](
            !0
            /* cancelled */
          ), se(L, () => {
            E(), F && F();
          });
        };
        R ? R(L, E, ne) : ne();
      }
    else
      l(L, y, S);
  }, z = (b, y, S, D = !1, U = !1) => {
    const {
      type: L,
      props: X,
      ref: Q,
      children: q,
      dynamicChildren: G,
      shapeFlag: pe,
      patchFlag: se,
      dirs: R,
      cacheIndex: F
    } = b;
    if (se === -2 && (U = !1), Q != null && (Dt(), Cs(Q, null, S, b, !0), Lt()), F != null && (y.renderCache[F] = void 0), pe & 256) {
      y.ctx.deactivate(b);
      return;
    }
    const E = pe & 1 && R, ne = !cs(b);
    let ve;
    if (ne && (ve = X && X.onVnodeBeforeUnmount) && wt(ve, y, b), pe & 6)
      Ge(b.component, S, D);
    else {
      if (pe & 128) {
        b.suspense.unmount(S, D);
        return;
      }
      E && Jt(b, null, y, "beforeUnmount"), pe & 64 ? b.type.remove(
        b,
        y,
        S,
        de,
        D
      ) : G && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !G.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (L !== Y || se > 0 && se & 64) ? We(
        G,
        y,
        S,
        !1,
        !0
      ) : (L === Y && se & 384 || !U && pe & 16) && We(q, y, S), D && ae(b);
    }
    (ne && (ve = X && X.onVnodeUnmounted) || E) && lt(() => {
      ve && wt(ve, y, b), E && Jt(b, null, y, "unmounted");
    }, S);
  }, ae = (b) => {
    const { type: y, el: S, anchor: D, transition: U } = b;
    if (y === Y) {
      Se(S, D);
      return;
    }
    if (y === On) {
      j(b);
      return;
    }
    const L = () => {
      i(S), U && !U.persisted && U.afterLeave && U.afterLeave();
    };
    if (b.shapeFlag & 1 && U && !U.persisted) {
      const { leave: X, delayLeave: Q } = U, q = () => X(S, L);
      Q ? Q(b.el, L, q) : q();
    } else
      L();
  }, Se = (b, y) => {
    let S;
    for (; b !== y; )
      S = g(b), i(b), b = S;
    i(y);
  }, Ge = (b, y, S) => {
    const { bum: D, scope: U, job: L, subTree: X, um: Q, m: q, a: G } = b;
    ql(q), ql(G), D && Ks(D), U.stop(), L && (L.flags |= 8, z(X, b, y, S)), Q && lt(Q, y), lt(() => {
      b.isUnmounted = !0;
    }, y);
  }, We = (b, y, S, D = !1, U = !1, L = 0) => {
    for (let X = L; X < b.length; X++)
      z(b[X], y, S, D, U);
  }, N = (b) => {
    if (b.shapeFlag & 6)
      return N(b.component.subTree);
    if (b.shapeFlag & 128)
      return b.suspense.next();
    const y = g(b.anchor || b.el), S = y && y[hr];
    return S ? g(S) : y;
  };
  let ie = !1;
  const ee = (b, y, S) => {
    let D;
    b == null ? y._vnode && (z(y._vnode, null, null, !0), D = y._vnode.component) : x(
      y._vnode || null,
      b,
      y,
      null,
      null,
      null,
      S
    ), y._vnode = b, ie || (ie = !0, Ll(D), gi(), ie = !1);
  }, de = {
    p: x,
    um: z,
    m: W,
    r: ae,
    mt: Re,
    mc: $,
    pc: P,
    pbc: T,
    n: N,
    o: e
  };
  return {
    render: ee,
    hydrate: void 0,
    createApp: Nr(ee)
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
  if (_e(l) && _e(i))
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
    const h = e[l];
    if (h !== 0) {
      if (i = s[s.length - 1], e[i] < h) {
        t[l] = i, s.push(l);
        continue;
      }
      for (r = 0, c = s.length - 1; r < c; )
        u = r + c >> 1, e[s[u]] < h ? r = u + 1 : c = u;
      h < e[s[r]] && (r > 0 && (t[l] = s[r - 1]), s[r] = l);
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
  t && t.pendingBranch ? _e(e) ? t.effects.push(...e) : t.effects.push(e) : cr(e);
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
    Z(
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
const Z = tc;
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
    u && !Ve(u) && (t.class = ge(u)), Pe(d) && (/* @__PURE__ */ fn(d) && !_e(d) && (d = Ke({}, d)), t.style = ol(d));
  }
  const c = Ve(e) ? 1 : Bi(e) ? 128 : gr(e) ? 64 : Pe(e) ? 4 : ye(e) ? 2 : 0;
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
  const { props: i, ref: r, patchFlag: c, children: u, transition: d } = e, h = t ? nc(i || {}, t) : i, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: h,
    key: h && ji(h),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && r ? _e(r) ? r.concat(qs(t)) : [r, qs(t)] : qs(t)
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
  return Z(mn, null, e, t);
}
function ue(e = "", t = !1) {
  return t ? (m(), He(Vt, null, e)) : Z(Vt, null, e);
}
function St(e) {
  return e == null || typeof e == "boolean" ? Z(Vt) : _e(e) ? Z(
    Y,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Ns(e) ? Ot(e) : Z(mn, null, String(e));
}
function Ot(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ds(e);
}
function $l(e, t) {
  let s = 0;
  const { shapeFlag: l } = e;
  if (t == null)
    t = null;
  else if (_e(t))
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
        t.class !== l.class && (t.class = ge([t.class, l.class]));
      else if (i === "style")
        t.style = ol([t.style, l.style]);
      else if (an(i)) {
        const r = t[i], c = l[i];
        c && r !== c && !(_e(r) && r.includes(c)) && (t[i] = r ? [].concat(r, c) : c);
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
    propsDefaults: Oe,
    // inheritAttrs
    inheritAttrs: l.inheritAttrs,
    // state
    ctx: Oe,
    data: Oe,
    props: Oe,
    attrs: Oe,
    slots: Oe,
    refs: Oe,
    setupState: Oe,
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
  ye(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Pe(t) && (e.setupState = _l(t)), zi(e);
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
const K = (e, t) => /* @__PURE__ */ lr(e, t, Ds);
function qi(e, t, s) {
  try {
    sn(-1);
    const l = arguments.length;
    return l === 2 ? Pe(t) && !_e(t) ? Ns(t) ? Z(e, null, [t]) : Z(e, t) : Z(e, null, t) : (l > 3 ? s = Array.prototype.slice.call(arguments, 2) : l === 3 && Ns(s) && (s = [s]), Z(e, t, s));
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
  if (_e(s))
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
      const h = r[t] = Ec(
        l,
        i
      );
      Nt(e, u, h, d);
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
  if (_e(t)) {
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
  return _e(t) ? (s) => Ks(t, s) : t;
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
      if (_e(l)) {
        const u = rl(l, i), d = u !== -1;
        if (r && !d)
          c(l.concat(i));
        else if (!r && d) {
          const h = [...l];
          h.splice(u, 1), c(h);
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
  if (_e(t))
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
  const s = e.multiple, l = _e(t);
  if (!(s && !l && !gs(t))) {
    for (let i = 0, r = e.options.length; i < r; i++) {
      const c = e.options[i], u = fs(c);
      if (s)
        if (l) {
          const d = typeof u;
          d === "string" || d === "number" ? c.selected = t.some((h) => String(h) === String(u)) : c.selected = rl(t, u) > -1;
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
  const e = qa(!0), t = e.run(() => /* @__PURE__ */ B({}));
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
  function h() {
    u || (s.state.value[e] = i ? i() : {});
    const f = /* @__PURE__ */ Xo(s.state.value[e]);
    return Ht(f, r, Object.keys(c || {}).reduce((p, g) => (p[g] = gl(K(() => {
      vn(s);
      const _ = s._s.get(e);
      return c[g].call(_, _);
    })), p), {}));
  }
  return d = eo(e, h, t, s, l, !0), d;
}
function eo(e, t, s = {}, l, i, r) {
  let c;
  const u = Ht({ actions: {} }, s), d = { deep: !0 };
  let h, f, p = [], g = [], _;
  const w = l.state.value[e];
  !r && !w && (l.state.value[e] = {});
  let x;
  function H($) {
    let C;
    h = f = !1, typeof $ == "function" ? ($(l.state.value[e]), C = {
      type: Es.patchFunction,
      storeId: e,
      events: _
    }) : (Yn(l.state.value[e], $), C = {
      type: Es.patchObject,
      payload: $,
      storeId: e,
      events: _
    });
    const T = x = Symbol();
    hn().then(() => {
      x === T && (h = !0);
    }), f = !0, ss(p, C, l.state.value[e]);
  }
  const O = r ? function() {
    const { state: C } = s, T = C ? C() : {};
    this.$patch((ce) => {
      Ht(ce, T);
    });
  } : (
    /* istanbul ignore next */
    Xi
  );
  function M() {
    c.stop(), p = [], g = [], l._s.delete(e);
  }
  const I = ($, C = "") => {
    if (ha in $)
      return $[Nn] = C, $;
    const T = function() {
      vn(l);
      const ce = Array.from(arguments), re = [], me = [];
      function Re(k) {
        re.push(k);
      }
      function Ee(k) {
        me.push(k);
      }
      ss(g, {
        args: ce,
        name: T[Nn],
        store: te,
        after: Re,
        onError: Ee
      });
      let V;
      try {
        V = $.apply(this && this.$id === e ? this : te, ce);
      } catch (k) {
        throw ss(me, k), k;
      }
      return V instanceof Promise ? V.then((k) => (ss(re, k), k)).catch((k) => (ss(me, k), Promise.reject(k))) : (ss(re, V), V);
    };
    return T[ha] = !0, T[Nn] = C, T;
  }, j = {
    _p: l,
    // _s: scope,
    $id: e,
    $onAction: pa.bind(null, g),
    $patch: H,
    $reset: O,
    $subscribe($, C = {}) {
      const T = pa(p, $, C.detached, () => ce()), ce = c.run(() => Me(() => l.state.value[e], (re) => {
        (C.flush === "sync" ? f : h) && $({
          storeId: e,
          type: Es.direct,
          events: _
        }, re);
      }, Ht({}, d, C)));
      return T;
    },
    $dispose: M
  }, te = /* @__PURE__ */ Ft(j);
  l._s.set(e, te);
  const A = (l._a && l._a.runWithContext || zc)(() => l._e.run(() => (c = qa()).run(() => t({ action: I }))));
  for (const $ in A) {
    const C = A[$];
    if (/* @__PURE__ */ Fe(C) && !Qc(C) || /* @__PURE__ */ Rt(C))
      r || (w && Jc(C) && (/* @__PURE__ */ Fe(C) ? C.value = w[$] : Yn(C, w[$])), l.state.value[e][$] = C);
    else if (typeof C == "function") {
      const T = I(C, $);
      A[$] = T, u.actions[$] = C;
    }
  }
  return Ht(te, A), Ht(/* @__PURE__ */ Ce(te), A), Object.defineProperty(te, "$state", {
    get: () => l.state.value[e],
    set: ($) => {
      H((C) => {
        Ht(C, $);
      });
    }
  }), l._p.forEach(($) => {
    Ht(te, c.run(() => $({
      store: te,
      app: l._a,
      pinia: l,
      options: u
    })));
  }), w && r && s.hydrate && s.hydrate(te.$state, w), h = !0, f = !0, te;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function yn(e, t, s) {
  let l, i;
  const r = typeof t == "function";
  typeof e == "string" ? (l = e, i = r ? s : t) : (i = e, l = e.id);
  function c(u, d) {
    const h = ur();
    return u = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    u || (h ? ut(Zi, null) : null), u && vn(u), u = Yi, u._s.has(l) || (r ? eo(l, t, i, u) : Yc(l, i, u)), u._s.get(l);
  }
  return c.$id = l, c;
}
function to(e) {
  {
    const t = /* @__PURE__ */ Ce(e), s = {};
    for (const l in t) {
      const i = t[l];
      i.effect ? s[l] = // ...
      K({
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
  const e = /* @__PURE__ */ B(!1), t = /* @__PURE__ */ B(!1), s = /* @__PURE__ */ B(!0), l = /* @__PURE__ */ B(!1), i = /* @__PURE__ */ B(!1), r = /* @__PURE__ */ B(null), c = /* @__PURE__ */ B("openclaw-guard auth show-password"), u = /* @__PURE__ */ B(!1), d = /* @__PURE__ */ B(!1), h = K(() => e.value && s.value && !u.value);
  function f() {
    no(), u.value = !1, d.value = !1;
  }
  async function p() {
    if (!(t.value || e.value)) {
      t.value = !0;
      try {
        const M = await su();
        if (s.value = M.enabled, l.value = M.configured, i.value = M.initialPasswordAvailable, r.value = M.initialPasswordCreatedAt, c.value = M.revealCommand || c.value, !M.enabled) {
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
  async function g(M) {
    const I = await lu(M);
    return I.token && (Zc(I.token), u.value = !0), I;
  }
  async function _() {
    try {
      await au();
    } catch {
    } finally {
      f();
    }
  }
  async function w(M, I) {
    const j = await iu(M, I);
    if (!j.success)
      throw new Error(j.error || "Password update failed");
    return f(), j;
  }
  function x() {
    d.value = !0;
  }
  function H() {
    d.value = !1;
  }
  function O() {
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
    requiresLogin: h,
    changePasswordOpen: d,
    hydrate: p,
    login: g,
    logout: _,
    changePassword: w,
    openChangePassword: x,
    closeChangePassword: H,
    handleUnauthorized: O
  };
});
let ou = 0;
const it = /* @__PURE__ */ yn("feedback", () => {
  const e = /* @__PURE__ */ B([]), t = /* @__PURE__ */ B(null);
  let s = null;
  function l(u) {
    const d = {
      id: ++ou,
      title: u.title,
      message: u.message,
      tone: u.tone || "info"
    };
    e.value.push(d);
    const h = typeof u.durationMs == "number" ? u.durationMs : 3600;
    return typeof window < "u" && h > 0 && window.setTimeout(() => i(d.id), h), d.id;
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
  const e = /* @__PURE__ */ B("auto"), t = /* @__PURE__ */ B("zh"), s = /* @__PURE__ */ B(!1), l = /* @__PURE__ */ B(!1), i = K(() => e.value === "auto" ? ru() : e.value);
  function r() {
    typeof document > "u" || (document.documentElement.dataset.theme = i.value, document.documentElement.lang = t.value === "zh" ? "zh-CN" : "en", document.documentElement.dataset.developerMode = s.value ? "on" : "off");
  }
  function c() {
    if (l.value || typeof window > "u") {
      r();
      return;
    }
    const p = window.localStorage.getItem(ga), g = window.localStorage.getItem(_a), _ = window.localStorage.getItem(ma);
    (p === "auto" || p === "light" || p === "dark") && (e.value = p), (g === "zh" || g === "en") && (t.value = g), s.value = _ === "1", l.value = !0, r();
  }
  function u(p) {
    e.value = p, typeof window < "u" && window.localStorage.setItem(ga, p), r();
  }
  function d(p) {
    t.value = p, typeof window < "u" && window.localStorage.setItem(_a, p), r();
  }
  function h(p) {
    s.value = p, typeof window < "u" && window.localStorage.setItem(ma, p ? "1" : "0"), r();
  }
  function f(p, g) {
    return t.value === "zh" ? p : g;
  }
  return {
    themePreference: e,
    language: t,
    developerMode: s,
    resolvedTheme: i,
    hydrate: c,
    setThemePreference: u,
    setLanguage: d,
    setDeveloperMode: h,
    applyDocumentState: r,
    label: f
  };
}), cu = { class: "confirm-dialog auth-dialog" }, uu = { class: "confirm-dialog__header" }, du = { class: "page-card__eyebrow" }, fu = { class: "page-card__title" }, pu = { class: "auth-dialog__body" }, hu = { class: "field-stack" }, gu = { class: "field-stack" }, _u = { class: "field-stack" }, mu = { class: "login-note" }, bu = {
  key: 0,
  class: "login-error"
}, vu = { class: "confirm-dialog__footer" }, yu = ["disabled"], wu = /* @__PURE__ */ Le({
  __name: "ChangePasswordDialog",
  setup(e) {
    const t = je(), s = wn(), l = it(), i = /* @__PURE__ */ B(""), r = /* @__PURE__ */ B(""), c = /* @__PURE__ */ B(""), u = /* @__PURE__ */ B(!1), d = /* @__PURE__ */ B("");
    function h() {
      i.value = "", r.value = "", c.value = "", d.value = "", u.value = !1;
    }
    function f() {
      h(), s.closeChangePassword();
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
      } catch (g) {
        d.value = g instanceof Error ? g.message : String(g), u.value = !1;
      }
    }
    return (g, _) => a(s).changePasswordOpen ? (m(), v("div", {
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
              "onUpdate:modelValue": _[0] || (_[0] = (w) => i.value = w),
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
              "onUpdate:modelValue": _[1] || (_[1] = (w) => r.value = w),
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
              "onUpdate:modelValue": _[2] || (_[2] = (w) => c.value = w),
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
    const t = je(), s = wn(), l = /* @__PURE__ */ B(""), i = /* @__PURE__ */ B(!1), r = /* @__PURE__ */ B(""), c = K(() => s.initialPasswordAvailable ? t.label(
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
    return (d, h) => (m(), v("div", $u, [
      n("section", ku, [
        n("div", { class: "login-card__brand" }, [
          n("img", {
            class: "login-card__logo",
            src: Iu,
            alt: "OpenClaw Guard"
          }),
          h[1] || (h[1] = n("div", null, [
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
              "onUpdate:modelValue": h[0] || (h[0] = (f) => l.value = f),
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
    const t = it(), { confirmRequest: s } = to(t), l = K(() => !!s.value);
    return (i, r) => {
      var c, u, d, h, f, p;
      return l.value ? (m(), v("div", {
        key: 0,
        class: "confirm-backdrop",
        onClick: r[2] || (r[2] = _s((g) => a(t).resolveConfirm(!1), ["self"]))
      }, [
        n("section", {
          class: ge(["confirm-dialog", { "confirm-dialog--danger": ((c = a(s)) == null ? void 0 : c.tone) === "danger" }])
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
              onClick: r[0] || (r[0] = (g) => a(t).resolveConfirm(!1))
            }, o((h = a(s)) == null ? void 0 : h.cancelLabel), 1),
            n("button", {
              class: ge(["inline-link", { "inline-link--danger": ((f = a(s)) == null ? void 0 : f.tone) === "danger" }]),
              type: "button",
              onClick: r[1] || (r[1] = (g) => a(t).resolveConfirm(!0))
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
        class: ge(["toast-card", `toast-card--${r.tone}`])
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
    const h = (g) => {
      g === !1 ? d(hs(Ue.NAVIGATION_ABORTED, {
        from: s,
        to: t
      })) : g instanceof Error ? d(g) : vd(g) ? d(hs(Ue.NAVIGATION_GUARD_REDIRECT, {
        from: t,
        to: g
      })) : (c && l.enterCallbacks[i] === c && typeof g == "function" && c.push(g), u());
    }, f = r(() => e.call(l && l.instances[i], t, s, h));
    let p = Promise.resolve(f);
    e.length < 3 && (p = p.then(h)), p.catch((g) => d(g));
  });
}
function Un(e, t, s, l, i = (r) => r()) {
  const r = [];
  for (const c of e)
    for (const u in c.components) {
      let d = c.components[u];
      if (!(t !== "beforeRouteEnter" && !c.instances[u]))
        if (ao(d)) {
          const h = (d.__vccOpts || d)[t];
          h && r.push(Wt(h, s, l, c, u, i));
        } else {
          let h = d();
          r.push(() => h.then((f) => {
            if (!f) throw new Error(`Couldn't resolve component "${u}" at "${c.path}"`);
            const p = Ku(f) ? f.default : f;
            c.mods[u] = f, c.components[u] = p;
            const g = (p.__vccOpts || p)[t];
            return g && Wt(g, s, l, c, u, i)();
          }));
        }
    }
  return r;
}
function Cd(e, t) {
  const s = [], l = [], i = [], r = Math.max(t.matched.length, e.matched.length);
  for (let c = 0; c < r; c++) {
    const u = t.matched[c];
    u && (e.matched.find((h) => ps(h, u)) ? l.push(u) : s.push(u));
    const d = e.matched[c];
    d && (t.matched.find((h) => ps(h, d)) || i.push(d));
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
  const u = ({ state: g }) => {
    const _ = go(e, location), w = s.value, x = t.value;
    let H = 0;
    if (g) {
      if (s.value = _, t.value = g, c && c === w) {
        c = null;
        return;
      }
      H = x ? g.position - x.position : 0;
    } else l(_);
    i.forEach((O) => {
      O(s.value, w, {
        delta: H,
        type: el.pop,
        direction: H ? H > 0 ? Fn.forward : Fn.back : Fn.unknown
      });
    });
  };
  function d() {
    c = s.value;
  }
  function h(g) {
    i.push(g);
    const _ = () => {
      const w = i.indexOf(g);
      w > -1 && i.splice(w, 1);
    };
    return r.push(_), _;
  }
  function f() {
    if (document.visibilityState === "hidden") {
      const { history: g } = window;
      if (!g.state) return;
      g.replaceState(Te({}, g.state, { scroll: $n() }), "");
    }
  }
  function p() {
    for (const g of r) g();
    r = [], window.removeEventListener("popstate", u), window.removeEventListener("pagehide", f), document.removeEventListener("visibilitychange", f);
  }
  return window.addEventListener("popstate", u), window.addEventListener("pagehide", f), document.addEventListener("visibilitychange", f), {
    pauseListeners: d,
    listen: h,
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
  function r(d, h, f) {
    const p = e.indexOf("#"), g = p > -1 ? (s.host && document.querySelector("base") ? e : e.slice(p)) + d : xd() + e + d;
    try {
      t[f ? "replaceState" : "pushState"](h, "", g), i.value = h;
    } catch (_) {
      console.error(_), s[f ? "replace" : "assign"](g);
    }
  }
  function c(d, h) {
    r(d, Te({}, t.state, Sa(i.value.back, d, i.value.forward, !0), h, { position: i.value.position }), !0), l.value = d;
  }
  function u(d, h) {
    const f = Te({}, i.value, t.state, {
      forward: d,
      scroll: $n()
    });
    r(f.current, f, !0), r(d, Te({}, Sa(l.value, d, null), { position: f.position + 1 }, h), !1), l.value = d;
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
    throw new Error(`ERR (${s})/"${h}": ${_}`);
  }
  let s = Be.Static, l = s;
  const i = [];
  let r;
  function c() {
    r && i.push(r), r = [];
  }
  let u = 0, d, h = "", f = "";
  function p() {
    h && (s === Be.Static ? r.push({
      type: Zt.Static,
      value: h
    }) : s === Be.Param || s === Be.ParamRegExp || s === Be.ParamRegExpEnd ? (r.length > 1 && (d === "*" || d === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), r.push({
      type: Zt.Param,
      value: h,
      regexp: f,
      repeatable: d === "*" || d === "+",
      optional: d === "*" || d === "?"
    })) : t("Invalid state to consume buffer"), h = "");
  }
  function g() {
    h += d;
  }
  for (; u < e.length; ) {
    if (d = e[u++], d === "\\" && s !== Be.ParamRegExp) {
      l = s, s = Be.EscapeNext;
      continue;
    }
    switch (s) {
      case Be.Static:
        d === "/" ? (h && p(), c()) : d === ":" ? (p(), s = Be.Param) : g();
        break;
      case Be.EscapeNext:
        g(), s = l;
        break;
      case Be.Param:
        d === "(" ? s = Be.ParamRegExp : Od.test(d) ? g() : (p(), s = Be.Static, d !== "*" && d !== "?" && d !== "+" && u--);
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
  return s === Be.ParamRegExp && t(`Unfinished custom RegExp for param "${h}"`), p(), c(), i;
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
  for (const h of e) {
    const f = h.length ? [] : [Xe.Root];
    s.strict && !h.length && (i += "/");
    for (let p = 0; p < h.length; p++) {
      const g = h[p];
      let _ = Xe.Segment + (s.sensitive ? Xe.BonusCaseSensitive : 0);
      if (g.type === Zt.Static)
        p || (i += "/"), i += g.value.replace(Nd, "\\$&"), _ += Xe.Static;
      else if (g.type === Zt.Param) {
        const { value: w, repeatable: x, optional: H, regexp: O } = g;
        r.push({
          name: w,
          repeatable: x,
          optional: H
        });
        const M = O || Ca;
        if (M !== Ca) {
          _ += Xe.BonusCustomRegExp;
          try {
            `${M}`;
          } catch (j) {
            throw new Error(`Invalid custom RegExp for param "${w}" (${M}): ` + j.message);
          }
        }
        let I = x ? `((?:${M})(?:/(?:${M}))*)` : `(${M})`;
        p || (I = H && h.length < 2 ? `(?:/${I})` : "/" + I), H && (I += "?"), i += I, _ += Xe.Dynamic, H && (_ += Xe.BonusOptional), x && (_ += Xe.BonusRepeatable), M === ".*" && (_ += Xe.BonusWildcard);
      }
      f.push(_);
    }
    l.push(f);
  }
  if (s.strict && s.end) {
    const h = l.length - 1;
    l[h][l[h].length - 1] += Xe.BonusStrict;
  }
  s.strict || (i += "/?"), s.end ? i += "$" : s.strict && !i.endsWith("/") && (i += "(?:/|$)");
  const c = new RegExp(i, s.sensitive ? "" : "i");
  function u(h) {
    const f = h.match(c), p = {};
    if (!f) return null;
    for (let g = 1; g < f.length; g++) {
      const _ = f[g] || "", w = r[g - 1];
      p[w.name] = _ && w.repeatable ? _.split("/") : _;
    }
    return p;
  }
  function d(h) {
    let f = "", p = !1;
    for (const g of e) {
      (!p || !f.endsWith("/")) && (f += "/"), p = !1;
      for (const _ of g) if (_.type === Zt.Static) f += _.value;
      else if (_.type === Zt.Param) {
        const { value: w, repeatable: x, optional: H } = _, O = w in h ? h[w] : "";
        if (mt(O) && !x) throw new Error(`Provided param "${w}" is an array but it is not repeatable (* or + modifiers)`);
        const M = mt(O) ? O.join("/") : O;
        if (!M) if (H)
          g.length < 2 && (f.endsWith("/") ? f = f.slice(0, -1) : p = !0);
        else throw new Error(`Missing required param "${w}"`);
        f += M;
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
  function r(p, g, _) {
    const w = !_, x = Ea(p);
    x.aliasOf = _ && _.record;
    const H = ba(t, p), O = [x];
    if ("alias" in p) {
      const j = typeof p.alias == "string" ? [p.alias] : p.alias;
      for (const te of j) O.push(Ea(Te({}, x, {
        components: _ ? _.record.components : x.components,
        path: te,
        aliasOf: _ ? _.record : x
      })));
    }
    let M, I;
    for (const j of O) {
      const { path: te } = j;
      if (g && te[0] !== "/") {
        const J = g.record.path, A = J[J.length - 1] === "/" ? "" : "/";
        j.path = g.record.path + (te && A + te);
      }
      if (M = Ud(j, g, H), _ ? _.alias.push(M) : (I = I || M, I !== M && I.alias.push(M), w && p.name && !Ta(M) && c(p.name)), mo(M) && d(M), x.children) {
        const J = x.children;
        for (let A = 0; A < J.length; A++) r(J[A], M, _ && _.children[A]);
      }
      _ = _ || M;
    }
    return I ? () => {
      c(I);
    } : Ts;
  }
  function c(p) {
    if (po(p)) {
      const g = l.get(p);
      g && (l.delete(p), s.splice(s.indexOf(g), 1), g.children.forEach(c), g.alias.forEach(c));
    } else {
      const g = s.indexOf(p);
      g > -1 && (s.splice(g, 1), p.record.name && l.delete(p.record.name), p.children.forEach(c), p.alias.forEach(c));
    }
  }
  function u() {
    return s;
  }
  function d(p) {
    const g = Hd(p, s);
    s.splice(g, 0, p), p.record.name && !Ta(p) && l.set(p.record.name, p);
  }
  function h(p, g) {
    let _, w = {}, x, H;
    if ("name" in p && p.name) {
      if (_ = l.get(p.name), !_) throw hs(Ue.MATCHER_NOT_FOUND, { location: p });
      H = _.record.name, w = Te(Ra(g.params, _.keys.filter((I) => !I.optional).concat(_.parent ? _.parent.keys.filter((I) => I.optional) : []).map((I) => I.name)), p.params && Ra(p.params, _.keys.map((I) => I.name))), x = _.stringify(w);
    } else if (p.path != null)
      x = p.path, _ = s.find((I) => I.re.test(x)), _ && (w = _.parse(x), H = _.record.name);
    else {
      if (_ = g.name ? l.get(g.name) : s.find((I) => I.re.test(g.path)), !_) throw hs(Ue.MATCHER_NOT_FOUND, {
        location: p,
        currentLocation: g
      });
      H = _.record.name, w = Te({}, g.params, p.params), x = _.stringify(w);
    }
    const O = [];
    let M = _;
    for (; M; )
      O.unshift(M.record), M = M.parent;
    return {
      name: H,
      path: x,
      params: w,
      matched: O,
      meta: Bd(O)
    };
  }
  e.forEach((p) => r(p));
  function f() {
    s.length = 0, l.clear();
  }
  return {
    addRoute: r,
    resolve: h,
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
  const t = ut(kn), s = ut(xl), l = K(() => {
    const d = a(e.to);
    return t.resolve(d);
  }), i = K(() => {
    const { matched: d } = l.value, { length: h } = d, f = d[h - 1], p = s.matched;
    if (!f || !p.length) return -1;
    const g = p.findIndex(ps.bind(null, f));
    if (g > -1) return g;
    const _ = Pa(d[h - 2]);
    return h > 1 && Pa(f) === _ && p[p.length - 1].path !== _ ? p.findIndex(ps.bind(null, d[h - 2])) : g;
  }), r = K(() => i.value > -1 && qd(s.params, l.value.params)), c = K(() => i.value > -1 && i.value === s.matched.length - 1 && fo(s.params, l.value.params));
  function u(d = {}) {
    if (zd(d)) {
      const h = t[a(e.replace) ? "replace" : "push"](a(e.to)).catch(Ts);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => h), h;
    }
    return Promise.resolve();
  }
  return {
    route: l,
    href: K(() => l.value.href),
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
    const s = /* @__PURE__ */ Ft(Aa(e)), { options: l } = ut(kn), i = K(() => ({
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
    const l = ut(sl), i = K(() => e.route || l.value), r = ut(ka, 0), c = K(() => {
      let h = a(r);
      const { matched: f } = i.value;
      let p;
      for (; (p = f[h]) && !p.components; ) h++;
      return h;
    }), u = K(() => i.value.matched[c.value]);
    zs(ka, K(() => c.value + 1)), zs(Sd, u), zs(sl, i);
    const d = /* @__PURE__ */ B();
    return Me(() => [
      d.value,
      u.value,
      e.name
    ], ([h, f, p], [g, _, w]) => {
      f && (f.instances[p] = h, _ && _ !== f && h && h === g && (f.leaveGuards.size || (f.leaveGuards = _.leaveGuards), f.updateGuards.size || (f.updateGuards = _.updateGuards))), h && f && (!_ || !ps(f, _) || !g) && (f.enterCallbacks[p] || []).forEach((x) => x(h));
    }, { flush: "post" }), () => {
      const h = i.value, f = e.name, p = u.value, g = p && p.components[f];
      if (!g) return Ma(s.default, {
        Component: g,
        route: h
      });
      const _ = p.props[f], w = _ ? _ === !0 ? h.params : typeof _ == "function" ? _(h) : _ : null, H = qi(g, Te({}, w, t, {
        onVnodeUnmounted: (O) => {
          O.component.isUnmounted && (p.instances[f] = null);
        },
        ref: d
      }));
      return Ma(s.default, {
        Component: H,
        route: h
      }) || H;
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
  let h = Bt;
  ls && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const f = Dn.bind(null, (N) => "" + N), p = Dn.bind(null, ad), g = Dn.bind(null, Ls);
  function _(N, ie) {
    let ee, de;
    return po(N) ? (ee = t.getRecordMatcher(N), de = ie) : de = N, t.addRoute(de, ee);
  }
  function w(N) {
    const ie = t.getRecordMatcher(N);
    ie && t.removeRoute(ie);
  }
  function x() {
    return t.getRoutes().map((N) => N.record);
  }
  function H(N) {
    return !!t.getRecordMatcher(N);
  }
  function O(N, ie) {
    if (ie = Te({}, ie || d.value), typeof N == "string") {
      const S = Ln(s, N, ie.path), D = t.resolve({ path: S.path }, ie), U = i.createHref(S.fullPath);
      return Te(S, D, {
        params: g(D.params),
        hash: Ls(S.hash),
        redirectedFrom: void 0,
        href: U
      });
    }
    let ee;
    if (N.path != null)
      ee = Te({}, N, { path: Ln(s, N.path, ie.path).path });
    else {
      const S = Te({}, N.params);
      for (const D in S) S[D] == null && delete S[D];
      ee = Te({}, N, { params: p(S) }), ie.params = p(ie.params);
    }
    const de = t.resolve(ee, ie), ke = N.hash || "";
    de.params = f(g(de.params));
    const b = rd(l, Te({}, N, {
      hash: sd(ke),
      path: de.path
    })), y = i.createHref(b);
    return Te({
      fullPath: b,
      hash: ke,
      query: l === $a ? kd(N.query) : N.query || {}
    }, de, {
      redirectedFrom: void 0,
      href: y
    });
  }
  function M(N) {
    return typeof N == "string" ? Ln(s, N, d.value.path) : Te({}, N);
  }
  function I(N, ie) {
    if (h !== N) return hs(Ue.NAVIGATION_CANCELLED, {
      from: ie,
      to: N
    });
  }
  function j(N) {
    return A(N);
  }
  function te(N) {
    return j(Te(M(N), { replace: !0 }));
  }
  function J(N, ie) {
    const ee = N.matched[N.matched.length - 1];
    if (ee && ee.redirect) {
      const { redirect: de } = ee;
      let ke = typeof de == "function" ? de(N, ie) : de;
      return typeof ke == "string" && (ke = ke.includes("?") || ke.includes("#") ? ke = M(ke) : { path: ke }, ke.params = {}), Te({
        query: N.query,
        hash: N.hash,
        params: ke.path != null ? {} : N.params
      }, ke);
    }
  }
  function A(N, ie) {
    const ee = h = O(N), de = d.value, ke = N.state, b = N.force, y = N.replace === !0, S = J(ee, de);
    if (S) return A(Te(M(S), {
      state: typeof S == "object" ? Te({}, ke, S.state) : ke,
      force: b,
      replace: y
    }), ie || ee);
    const D = ee;
    D.redirectedFrom = ie;
    let U;
    return !b && cd(l, de, ee) && (U = hs(Ue.NAVIGATION_DUPLICATED, {
      to: D,
      from: de
    }), W(de, de, !0, !1)), (U ? Promise.resolve(U) : T(D, de)).catch((L) => At(L) ? At(L, Ue.NAVIGATION_GUARD_REDIRECT) ? L : fe(L) : P(L, D, de)).then((L) => {
      if (L) {
        if (At(L, Ue.NAVIGATION_GUARD_REDIRECT))
          return A(Te({ replace: y }, M(L.to), {
            state: typeof L.to == "object" ? Te({}, ke, L.to.state) : ke,
            force: b
          }), ie || D);
      } else L = re(D, de, !0, y, ke);
      return ce(D, de, L), L;
    });
  }
  function $(N, ie) {
    const ee = I(N, ie);
    return ee ? Promise.reject(ee) : Promise.resolve();
  }
  function C(N) {
    const ie = Se.values().next().value;
    return ie && typeof ie.runWithContext == "function" ? ie.runWithContext(N) : N();
  }
  function T(N, ie) {
    let ee;
    const [de, ke, b] = Cd(N, ie);
    ee = Un(de.reverse(), "beforeRouteLeave", N, ie);
    for (const S of de) S.leaveGuards.forEach((D) => {
      ee.push(Wt(D, N, ie));
    });
    const y = $.bind(null, N, ie);
    return ee.push(y), We(ee).then(() => {
      ee = [];
      for (const S of r.list()) ee.push(Wt(S, N, ie));
      return ee.push(y), We(ee);
    }).then(() => {
      ee = Un(ke, "beforeRouteUpdate", N, ie);
      for (const S of ke) S.updateGuards.forEach((D) => {
        ee.push(Wt(D, N, ie));
      });
      return ee.push(y), We(ee);
    }).then(() => {
      ee = [];
      for (const S of b) if (S.beforeEnter) if (mt(S.beforeEnter)) for (const D of S.beforeEnter) ee.push(Wt(D, N, ie));
      else ee.push(Wt(S.beforeEnter, N, ie));
      return ee.push(y), We(ee);
    }).then(() => (N.matched.forEach((S) => S.enterCallbacks = {}), ee = Un(b, "beforeRouteEnter", N, ie, C), ee.push(y), We(ee))).then(() => {
      ee = [];
      for (const S of c.list()) ee.push(Wt(S, N, ie));
      return ee.push(y), We(ee);
    }).catch((S) => At(S, Ue.NAVIGATION_CANCELLED) ? S : Promise.reject(S));
  }
  function ce(N, ie, ee) {
    u.list().forEach((de) => C(() => de(N, ie, ee)));
  }
  function re(N, ie, ee, de, ke) {
    const b = I(N, ie);
    if (b) return b;
    const y = ie === Bt, S = ls ? history.state : {};
    ee && (de || y ? i.replace(N.fullPath, Te({ scroll: y && S && S.scroll }, ke)) : i.push(N.fullPath, ke)), d.value = N, W(N, ie, ee, y), fe();
  }
  let me;
  function Re() {
    me || (me = i.listen((N, ie, ee) => {
      if (!Ge.listening) return;
      const de = O(N), ke = J(de, Ge.currentRoute.value);
      if (ke) {
        A(Te(ke, {
          replace: !0,
          force: !0
        }), de).catch(Ts);
        return;
      }
      h = de;
      const b = d.value;
      ls && md(wa(b.fullPath, ee.delta), $n()), T(de, b).catch((y) => At(y, Ue.NAVIGATION_ABORTED | Ue.NAVIGATION_CANCELLED) ? y : At(y, Ue.NAVIGATION_GUARD_REDIRECT) ? (A(Te(M(y.to), { force: !0 }), de).then((S) => {
        At(S, Ue.NAVIGATION_ABORTED | Ue.NAVIGATION_DUPLICATED) && !ee.delta && ee.type === el.pop && i.go(-1, !1);
      }).catch(Ts), Promise.reject()) : (ee.delta && i.go(-ee.delta, !1), P(y, de, b))).then((y) => {
        y = y || re(de, b, !1), y && (ee.delta && !At(y, Ue.NAVIGATION_CANCELLED) ? i.go(-ee.delta, !1) : ee.type === el.pop && At(y, Ue.NAVIGATION_ABORTED | Ue.NAVIGATION_DUPLICATED) && i.go(-1, !1)), ce(de, b, y);
      }).catch(Ts);
    }));
  }
  let Ee = ys(), V = ys(), k;
  function P(N, ie, ee) {
    fe(N);
    const de = V.list();
    return de.length ? de.forEach((ke) => ke(N, ie, ee)) : console.error(N), Promise.reject(N);
  }
  function be() {
    return k && d.value !== Bt ? Promise.resolve() : new Promise((N, ie) => {
      Ee.add([N, ie]);
    });
  }
  function fe(N) {
    return k || (k = !N, Re(), Ee.list().forEach(([ie, ee]) => N ? ee(N) : ie()), Ee.reset()), N;
  }
  function W(N, ie, ee, de) {
    const { scrollBehavior: ke } = e;
    if (!ls || !ke) return Promise.resolve();
    const b = !ee && bd(wa(N.fullPath, 0)) || (de || !ee) && history.state && history.state.scroll || null;
    return hn().then(() => ke(N, ie, b)).then((y) => y && _d(y)).catch((y) => P(y, N, ie));
  }
  const z = (N) => i.go(N);
  let ae;
  const Se = /* @__PURE__ */ new Set(), Ge = {
    currentRoute: d,
    listening: !0,
    addRoute: _,
    removeRoute: w,
    clearRoutes: t.clearRoutes,
    hasRoute: H,
    getRoutes: x,
    resolve: O,
    options: e,
    push: j,
    replace: te,
    go: z,
    back: () => z(-1),
    forward: () => z(1),
    beforeEach: r.add,
    beforeResolve: c.add,
    afterEach: u.add,
    onError: V.add,
    isReady: be,
    install(N) {
      N.component("RouterLink", Rl), N.component("RouterView", bo), N.config.globalProperties.$router = Ge, Object.defineProperty(N.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => a(d)
      }), ls && !ae && d.value === Bt && (ae = !0, j(i.location).catch((de) => {
      }));
      const ie = {};
      for (const de in Bt) Object.defineProperty(ie, de, {
        get: () => d.value[de],
        enumerable: !0
      });
      N.provide(kn, Ge), N.provide(xl, /* @__PURE__ */ ui(ie)), N.provide(sl, d);
      const ee = N.unmount;
      Se.add(N), N.unmount = function() {
        Se.delete(N), Se.size < 1 && (h = Bt, me && me(), me = null, d.value = Bt, ae = !1, k = !1), ee();
      };
    }
  };
  function We(N) {
    return N.reduce((ie, ee) => ie.then(() => C(ee)), Promise.resolve());
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
    ], h = K(() => t.themePreference === "light" ? "☀" : t.themePreference === "dark" ? "☾" : "⌘"), f = K(() => {
      const _ = c.flatMap((x) => x.items).find((x) => x.to === i.path);
      if (_)
        return t.label(_.zh, _.en);
      const w = u[i.path];
      return w ? t.label(w.zh, w.en) : t.label("首页", "Home");
    });
    ze(() => {
      t.hydrate();
    }), Me(() => t.themePreference, () => t.applyDocumentState()), Me(() => t.language, () => t.applyDocumentState()), Me(() => t.developerMode, () => t.applyDocumentState());
    function p() {
      r.push("/settings");
    }
    async function g() {
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
    return (_, w) => (m(), v("div", Zd, [
      n("header", Xd, [
        n("div", { class: "brand-lockup" }, [
          n("img", {
            class: "brand-lockup__logo",
            src: $f,
            alt: "OpenClaw Guard"
          }),
          w[3] || (w[3] = n("div", null, [
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
            }, o(h.value), 9, sf),
            n("div", nf, [
              (m(), v(Y, null, we(d, (x) => n("button", {
                key: x.value,
                class: "toolbar-popover__item",
                type: "button",
                onClick: (H) => a(t).setThemePreference(x.value)
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
                onClick: w[0] || (w[0] = (x) => a(t).setLanguage("zh"))
              }, [...w[4] || (w[4] = [
                n("span", null, "中", -1),
                n("span", null, "中文", -1)
              ])]),
              n("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: w[1] || (w[1] = (x) => a(t).setLanguage("en"))
              }, [...w[5] || (w[5] = [
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
                w[6] || (w[6] = n("span", null, "⟡", -1)),
                n("span", null, o(a(t).label("设置", "Settings")), 1)
              ]),
              n("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: w[2] || (w[2] = (x) => a(s).openChangePassword())
              }, [
                w[7] || (w[7] = n("span", null, "🔑", -1)),
                n("span", null, o(a(t).label("修改密码", "Change password")), 1)
              ]),
              n("button", {
                class: "toolbar-popover__item toolbar-popover__item--danger",
                type: "button",
                onClick: g
              }, [
                w[8] || (w[8] = n("span", null, "↩", -1)),
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
              (m(!0), v(Y, null, we(x.items, (H) => (m(), He(a(Rl), {
                key: H.to,
                to: H.to,
                class: ge(["sidebar-link", { "sidebar-link--active": a(i).path === H.to }])
              }, {
                default: le(() => [
                  wl(o(a(t).label(H.zh, H.en)), 1)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128))
            ])), 64))
          ])
        ]),
        n("main", wf, [
          Z(a(bo))
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
      Z(Wu),
      Z(Vu),
      Z(wu)
    ], 64));
  }
});
function at(e, t = null, s = {}) {
  const l = /* @__PURE__ */ B(t), i = s.immediate !== !1, r = /* @__PURE__ */ B(i && t === null), c = /* @__PURE__ */ B(!1), u = /* @__PURE__ */ B(null);
  async function d(h = {}) {
    h.silent === !0 ? c.value = !0 : r.value = !0, u.value = null;
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
function he(e) {
  return e == null || !Number.isFinite(e) ? "-" : new Intl.NumberFormat(void 0).format(e);
}
function xf(e) {
  return e == null || !Number.isFinite(e) ? "-" : `${e.toFixed(e >= 10 ? 0 : 1)}%`;
}
function Rf(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "-";
  if (e < 1024) return `${he(e)} B`;
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
    const l = je(), i = it(), r = at(() => If(), s, { immediate: !1 }), c = /* @__PURE__ */ B(""), u = /* @__PURE__ */ B(!1), d = /* @__PURE__ */ B(!1), h = /* @__PURE__ */ Ft({}), f = /* @__PURE__ */ Ft({}), p = K(() => {
      var $;
      return new Map(((($ = r.data) == null ? void 0 : $.channels) || []).map((C) => [C.id, C]));
    }), g = K(() => {
      var $;
      return new Map(((($ = r.data) == null ? void 0 : $.definitions) || []).map((C) => [C.id, C]));
    }), _ = K(() => {
      var $, C;
      return g.value.get(c.value) || ((C = ($ = r.data) == null ? void 0 : $.definitions) == null ? void 0 : C[0]) || null;
    }), w = K(() => {
      const $ = _.value;
      return $ ? p.value.get($.id) || {
        id: $.id,
        name: $.name,
        icon: $.icon,
        enabled: !1,
        configured: !1,
        config: {}
      } : null;
    }), x = K(() => {
      var $;
      return ((($ = r.data) == null ? void 0 : $.channels) || []).filter((C) => C.enabled).length;
    }), H = K(() => {
      var $;
      return ((($ = r.data) == null ? void 0 : $.channels) || []).filter((C) => C.configured).length;
    }), O = K(() => {
      const $ = _.value, C = [
        {
          key: "enabled",
          label: l.label("启用这个渠道", "Enable this channel"),
          kind: "boolean",
          help: l.label("关闭后保留配置，但运行态不会接收这个入口的消息。", "Keep the config but stop receiving traffic from this channel.")
        }
      ];
      for (const T of ($ == null ? void 0 : $.fields) || []) {
        if (T === "requireMention" || T === "streaming") {
          C.push({
            key: T,
            label: Ws(T),
            kind: "boolean",
            help: l.label("勾选即启用。", "Checked means enabled.")
          });
          continue;
        }
        if (t[T]) {
          C.push({
            key: T,
            label: Ws(T),
            kind: "text",
            inputType: "select",
            options: t[T].map((ce) => ({ value: ce, label: ce }))
          });
          continue;
        }
        C.push({
          key: T,
          label: Ws(T),
          kind: "text",
          inputType: /port/i.test(T) ? "number" : Da(T) ? "password" : "text"
        });
      }
      for (const T of ($ == null ? void 0 : $.envFields) || [])
        C.push({
          key: `env:${T}`,
          label: `${Ws(T)} (${T})`,
          kind: "text",
          inputType: "password",
          env: !0,
          help: l.label("留空会清除这个本机环境变量。", "Leave blank to clear this local environment variable.")
        });
      return C;
    });
    function M() {
      for (const $ of Object.keys(h)) delete h[$];
      for (const $ of Object.keys(f)) delete f[$];
    }
    function I() {
      var T, ce;
      M();
      const $ = w.value, C = _.value;
      if (!(!$ || !C)) {
        f.enabled = $.enabled === !0;
        for (const re of C.fields) {
          const me = (T = $.config) == null ? void 0 : T[re];
          re === "requireMention" || re === "streaming" ? f[re] = Ef(me) : h[re] = me == null ? "" : String(me);
        }
        for (const re of C.envFields) {
          const me = `env:${re}`;
          h[me] = ((ce = $.config) == null ? void 0 : ce[me]) == null ? "" : String($.config[me]);
        }
      }
    }
    Me(
      () => r.data,
      ($) => {
        $ && (s = $);
        const C = ($ == null ? void 0 : $.definitions) || [];
        if (C.length) {
          if (!c.value || !g.value.has(c.value)) {
            c.value = C[0].id;
            return;
          }
          I();
        }
      },
      { immediate: !0 }
    ), Me(c, () => {
      I();
    }), ze(() => {
      r.execute({ silent: !!r.data });
    });
    function j() {
      const $ = w.value;
      return $ ? $.id === "feishu" ? $.enabled ? l.label(
        "飞书在开源版里作为官方渠道维护。保存后会直接更新当前机器上的接入配置和回复策略。",
        "Feishu is maintained here as an official channel. Saving updates the live connection settings on this machine."
      ) : l.label(
        "飞书当前处于停用状态。先补齐机器人凭据和接入方式，再决定是否启用会更稳妥。",
        "Feishu is currently disabled. Complete the bot credentials and connection mode first, then decide whether to enable it."
      ) : $.enabled ? l.label("保存后会直接更新当前消息入口配置。", "Saving here updates the live channel configuration immediately.") : l.label("这个消息入口当前停用中。可以先补齐配置，再决定是否启用。", "This channel is currently disabled. Finish the settings first, then decide whether to enable it.") : "";
    }
    async function te() {
      const $ = w.value, C = _.value;
      if (!(!$ || !C)) {
        u.value = !0;
        try {
          const T = {
            enabled: f.enabled === !0
          };
          for (const re of C.fields) {
            if (re === "requireMention" || re === "streaming") {
              T[re] = f[re] === !0;
              continue;
            }
            const me = h[re] ?? "";
            /port/i.test(re) ? T[re] = ln(me) ?? "" : T[re] = me;
          }
          for (const re of C.envFields)
            T[`env:${re}`] = h[`env:${re}`] ?? "";
          const ce = await Nf($.id, T);
          i.pushToast({
            tone: ce.success ? "success" : "error",
            message: ce.message
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
    }
    async function J() {
      const $ = w.value;
      if (!(!$ || !await i.confirm({
        title: l.label("清空渠道配置", "Clear channel configuration"),
        message: l.label(
          `确认清空 ${$.name || $.id} 的配置吗？这会移除本机保存的字段和值。`,
          `Clear the configuration for ${$.name || $.id}? This removes the saved local values for this channel.`
        ),
        confirmLabel: l.label("确认清空", "Clear configuration"),
        cancelLabel: l.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        d.value = !0;
        try {
          const T = await Df($.id);
          i.pushToast({
            tone: T.success ? "success" : "error",
            message: T.message
          }), await r.execute({ silent: !0 });
        } catch (T) {
          i.pushToast({
            tone: "error",
            message: T instanceof Error ? T.message : String(T)
          });
        } finally {
          d.value = !1;
        }
      }
    }
    function A($) {
      return h[$] ?? "";
    }
    return ($, C) => (m(), v("div", Lf, [
      n("header", Ff, [
        n("div", null, [
          n("p", Uf, o(a(l).label("渠道 / Second slice", "Channels / Second slice")), 1),
          n("h2", Vf, o(a(l).label("渠道管理", "Channel management")), 1),
          n("p", Gf, o(a(l).label("先把官方渠道和内置入口迁入模块化外壳，保持真实配置读写，后续再承接插件扩展。", "Move official channels and built-in entry points into the modular shell with real read-write behavior, then extend from here later.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: C[0] || (C[0] = (T) => a(r).execute({ silent: !0 }))
        }, o(a(r).refreshing ? a(l).label("刷新中…", "Refreshing…") : a(l).label("刷新", "Refresh")), 1)
      ]),
      a(r).loading && !a(r).data ? (m(), v("div", Bf, o(a(l).label("正在读取渠道配置…", "Loading channel configuration…")), 1)) : a(r).error && !a(r).data ? (m(), v("div", Hf, o(a(r).error), 1)) : a(r).data && w.value ? (m(), v(Y, { key: 2 }, [
        a(r).error ? (m(), v("div", jf, o(a(l).label("已保留上一版渠道快照，但后台刷新失败：", "The last channel snapshot is still on screen, but the background refresh failed: ")) + o(a(r).error), 1)) : ue("", !0),
        Z(oe, {
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
                n("strong", null, o(H.value), 1),
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
          Z(oe, {
            title: a(l).label("渠道目录", "Channel catalog"),
            eyebrow: "Catalog"
          }, {
            default: le(() => [
              n("div", tp, [
                (m(!0), v(Y, null, we(a(r).data.definitions, (T) => {
                  var ce, re, me, Re;
                  return m(), v("button", {
                    key: T.id,
                    class: ge(["catalog-list__item", { "catalog-list__item--active": c.value === T.id }]),
                    type: "button",
                    onClick: (Ee) => c.value = T.id
                  }, [
                    n("div", np, [
                      n("strong", null, o(`${T.icon} ${T.name}`), 1)
                    ]),
                    n("div", lp, [
                      n("span", {
                        class: ge(["pill", (ce = p.value.get(T.id)) != null && ce.enabled ? "pill--success" : "pill--warning"])
                      }, o((re = p.value.get(T.id)) != null && re.enabled ? a(l).label("已启用", "Enabled") : a(l).label("停用", "Disabled")), 3),
                      n("span", {
                        class: ge(["pill", (me = p.value.get(T.id)) != null && me.configured ? "pill--success" : "pill--muted"])
                      }, o((Re = p.value.get(T.id)) != null && Re.configured ? a(l).label("已配置", "Configured") : a(l).label("未配置", "Empty")), 3)
                    ])
                  ], 10, sp);
                }), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          n("div", ap, [
            Z(oe, {
              title: w.value.name,
              eyebrow: "Editor"
            }, {
              default: le(() => [
                n("div", ip, [
                  n("span", {
                    class: ge(["pill", w.value.enabled ? "pill--success" : "pill--warning"])
                  }, o(w.value.enabled ? a(l).label("正在接收消息", "Receiving traffic") : a(l).label("当前停用", "Currently disabled")), 3),
                  n("span", {
                    class: ge(["pill", w.value.configured ? "pill--success" : "pill--muted"])
                  }, o(w.value.configured ? a(l).label("配置已完成", "Configured") : a(l).label("还未配置", "Not configured")), 3)
                ]),
                n("p", op, o(j()), 1),
                n("div", rp, [
                  (m(!0), v(Y, null, we(O.value, (T) => (m(), v("label", {
                    key: T.key,
                    class: "settings-field"
                  }, [
                    n("span", null, o(T.label), 1),
                    T.help ? (m(), v("small", cp, o(T.help), 1)) : ue("", !0),
                    T.kind === "text" && T.inputType !== "select" ? $e((m(), v("input", {
                      key: 1,
                      "onUpdate:modelValue": (ce) => h[T.key] = ce,
                      class: "settings-input",
                      type: T.inputType || "text"
                    }, null, 8, up)), [
                      [Nc, h[T.key]]
                    ]) : T.kind === "text" && T.inputType === "select" ? $e((m(), v("select", {
                      key: 2,
                      "onUpdate:modelValue": (ce) => h[T.key] = ce,
                      class: "settings-input"
                    }, [
                      (m(!0), v(Y, null, we(T.options, (ce) => (m(), v("option", {
                        key: ce.value,
                        value: ce.value
                      }, o(ce.label), 9, fp))), 128))
                    ], 8, dp)), [
                      [ft, h[T.key]]
                    ]) : (m(), v("label", pp, [
                      $e(n("input", {
                        "onUpdate:modelValue": (ce) => f[T.key] = ce,
                        type: "checkbox"
                      }, null, 8, hp), [
                        [as, f[T.key]]
                      ]),
                      n("span", null, o(T.help || a(l).label("勾选即启用。", "Checked means enabled.")), 1)
                    ]))
                  ]))), 128))
                ]),
                n("div", gp, [
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: u.value,
                    onClick: te
                  }, o(u.value ? a(l).label("保存中…", "Saving…") : a(l).label("保存渠道配置", "Save channel configuration")), 9, _p),
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: I
                  }, o(a(l).label("恢复当前值", "Reset draft")), 1),
                  n("button", {
                    class: "inline-link inline-link--danger",
                    type: "button",
                    disabled: d.value,
                    onClick: J
                  }, o(d.value ? a(l).label("清空中…", "Clearing…") : a(l).label("清空配置", "Clear configuration")), 9, mp)
                ])
              ]),
              _: 1
            }, 8, ["title"]),
            Z(oe, {
              title: a(l).label("配置摘要", "Configuration summary"),
              eyebrow: "Summary"
            }, {
              default: le(() => {
                var T, ce;
                return [
                  n("div", bp, [
                    n("article", vp, [
                      n("div", null, [
                        n("h3", null, o(a(l).label("普通字段", "Regular fields")), 1),
                        n("p", null, o(a(l).label("优先看这里就能知道这个渠道是否已经具备基本接入条件。", "Start here to see whether the channel has the basic information required to connect.")), 1)
                      ]),
                      n("strong", null, o(((T = _.value) == null ? void 0 : T.fields.length) || 0), 1)
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
                      n("strong", null, o(w.value.id), 1)
                    ])
                  ]),
                  a(l).developerMode ? (m(), v("pre", $p, o(JSON.stringify({
                    enabled: f.enabled,
                    fields: Object.fromEntries(Object.keys(h).filter((re) => !re.startsWith("env:")).map((re) => [re, a(Da)(re) && A(re) ? "******" : A(re)])),
                    envFields: Object.fromEntries(Object.keys(h).filter((re) => re.startsWith("env:")).map((re) => [re, A(re) ? "******" : ""]))
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
    const s = je(), l = it(), i = /* @__PURE__ */ B(""), r = /* @__PURE__ */ B("all"), c = /* @__PURE__ */ B("create"), u = /* @__PURE__ */ B(""), d = /* @__PURE__ */ B(""), h = /* @__PURE__ */ B(null), f = at(() => Cp(), t, { immediate: !1 }), p = /* @__PURE__ */ Ft(H());
    Me(() => f.data, (V) => {
      V && (t = V);
    }), ze(() => {
      f.execute({ silent: !!f.data });
    });
    const g = K(() => {
      var V;
      return ((V = f.data) == null ? void 0 : V.jobs) || [];
    }), _ = K(() => g.value.filter((V) => V.enabled)), w = K(() => g.value.filter((V) => !V.enabled)), x = K(() => {
      const V = i.value.trim().toLowerCase();
      return g.value.filter((k) => r.value === "enabled" && !k.enabled || r.value === "disabled" && k.enabled ? !1 : V ? [
        k.name,
        k.id,
        k.agentId,
        k.schedule,
        k.prompt,
        k.status
      ].join(" ").toLowerCase().includes(V) : !0);
    });
    Me(g, () => {
      c.value === "edit" && !g.value.find((V) => V.id === u.value) && M();
    });
    function H() {
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
    function O(V = H()) {
      Object.assign(p, V);
    }
    function M() {
      c.value = "create", u.value = "", O();
    }
    function I(V) {
      const k = Number(V);
      return !Number.isFinite(k) || k <= 0 ? "" : k % 864e5 === 0 ? `${k / 864e5}d` : k % 36e5 === 0 ? `${k / 36e5}h` : k % 6e4 === 0 ? `${k / 6e4}m` : k % 1e3 === 0 ? `${k / 1e3}s` : String(k);
    }
    function j(V) {
      const k = V.raw || {}, P = k.payload || {}, be = k.schedule || {}, fe = H();
      return be.kind === "every" ? (fe.scheduleMode = "every", fe.scheduleValue = I(be.everyMs)) : be.kind === "at" ? (fe.scheduleMode = "at", fe.scheduleValue = String(be.at || "")) : be.kind === "cron" && (fe.scheduleMode = "cron", fe.scheduleValue = String(be.expr || "")), !fe.scheduleValue && typeof V.schedule == "string" && (V.schedule.startsWith("cron ") ? (fe.scheduleMode = "cron", fe.scheduleValue = V.schedule.slice(5).trim()) : V.schedule.startsWith("every ") ? (fe.scheduleMode = "every", fe.scheduleValue = V.schedule.slice(6).trim()) : V.schedule.startsWith("at ") ? (fe.scheduleMode = "at", fe.scheduleValue = V.schedule.slice(3).trim()) : fe.scheduleValue = V.schedule.trim()), fe.stagger = I(be.staggerMs), fe.name = String(k.name || V.name || ""), fe.description = String(k.description || ""), fe.agentId = String(k.agentId || V.agentId || ""), fe.prompt = String(P.message || P.text || k.message || V.prompt || ""), fe.enabled = V.enabled !== !1, fe.timezone = String(k.tz || ""), fe.model = String(k.model || P.model || ""), fe.thinking = String(k.thinking || P.thinking || ""), fe.session = String(k.session || P.session || fe.session), fe.wake = String(k.wake || fe.wake), fe.timeoutSeconds = k.timeoutSeconds ? String(k.timeoutSeconds) : fe.timeoutSeconds, fe.announce = k.announce === !0 || k.deliver === !0, fe.bestEffortDeliver = k.bestEffortDeliver === !0, fe.deleteAfterRun = k.deleteAfterRun === !0, fe;
    }
    function te(V) {
      return V === !0 ? s.label("已开启", "Enabled") : V === !1 ? s.label("已关闭", "Disabled") : s.label("未知", "Unknown");
    }
    function J(V) {
      const k = String(V.status || "").trim().toLowerCase();
      if (!k) return V.enabled ? s.label("已启用", "Enabled") : s.label("已停用", "Disabled");
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
    function A(V) {
      const k = String(V.status || "").trim().toLowerCase();
      return ["running", "success", "completed", "enabled"].includes(k) ? "pill--success" : ["queued", "pending", "paused", "disabled"].includes(k) || V.enabled === !1 ? "pill--warning" : ["failed", "error"].includes(k) ? "pill--danger" : V.enabled ? "pill--info" : "pill--warning";
    }
    function $() {
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
    async function T() {
      await f.execute({ silent: !!f.data });
    }
    function ce(V, k) {
      h.value = {
        tone: k,
        message: V.message,
        detail: V.output,
        at: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    async function re(V, k = !1) {
      const P = V.success ? "success" : "error";
      ce(V, P), l.pushToast({
        tone: P,
        message: V.message
      }), V.success && k && M(), await T();
    }
    async function me() {
      const V = c.value === "edit" ? "update" : "create";
      d.value = V;
      try {
        const k = C(), P = c.value === "edit" ? await Rp({ jobId: u.value, ...k }) : await xp(k);
        await re(P, P.success);
      } catch (k) {
        const P = k instanceof Error ? k.message : String(k);
        h.value = {
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
    function Re(V) {
      c.value = "edit", u.value = V.id, O(j(V));
    }
    async function Ee(V, k) {
      if (V === "remove" && !await l.confirm({
        title: s.label("删除 Cron 任务", "Delete cron job"),
        message: s.label(`确认删除任务 ${k.id}？`, `Delete cron job ${k.id}?`),
        confirmLabel: s.label("确认删除", "Delete job"),
        cancelLabel: s.label("取消", "Cancel"),
        tone: "danger"
      }))
        return;
      const P = `${V}:${k.id}`;
      d.value = P;
      try {
        const be = V === "run" ? await Ap(k.id) : V === "enable" ? await Ep(k.id) : V === "disable" ? await Tp(k.id) : await Pp(k.id);
        await re(be, V === "remove" && c.value === "edit" && u.value === k.id);
      } catch (be) {
        const fe = be instanceof Error ? be.message : String(be);
        h.value = {
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
    return (V, k) => (m(), v("div", Op, [
      n("header", Mp, [
        n("div", null, [
          n("p", Ip, o(a(s).label("Cron / Fourth slice", "Cron / Fourth slice")), 1),
          n("h2", Np, o(a(s).label("自动化任务", "Automation jobs")), 1),
          n("p", Dp, o(a(s).label("把当前 Cron 的创建、编辑、运行、启停和删除能力迁进新壳层里，同时保持旧接口合同不变，让自动化真正进入模块化前端。", "Move cron create, edit, run, enable, disable, and remove flows into the new shell while keeping the existing backend contract unchanged, so automation is fully part of the modular frontend.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: T
        }, o(a(f).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新任务状态", "Refresh jobs")), 1)
      ]),
      a(f).loading && !a(f).data ? (m(), v("div", Lp, o(a(s).label("正在读取 Cron 状态与任务列表…", "Loading cron status and jobs…")), 1)) : a(f).error && !a(f).data ? (m(), v("div", Fp, o(a(f).error), 1)) : a(f).data ? (m(), v(Y, { key: 2 }, [
        Z(oe, {
          title: a(s).label("运行概览", "Runtime overview"),
          eyebrow: "Overview"
        }, {
          default: le(() => [
            n("div", Up, [
              n("article", Vp, [
                n("p", Gp, o(a(s).label("任务总数", "Jobs")), 1),
                n("strong", null, o(a(he)(a(f).data.jobs.length)) + " / " + o(a(he)(a(f).data.total)), 1),
                n("span", null, o(a(s).label("当前已加载任务 / 运行态汇总总量", "Loaded jobs / runtime total")), 1)
              ]),
              n("article", Bp, [
                n("p", Hp, o(a(s).label("已启用", "Enabled")), 1),
                n("strong", null, o(a(he)(_.value.length)), 1),
                n("span", null, o(a(s).label("这些任务会按计划自动执行", "These jobs run on their schedule")), 1)
              ]),
              n("article", jp, [
                n("p", Wp, o(a(s).label("已停用", "Disabled")), 1),
                n("strong", null, o(a(he)(w.value.length)), 1),
                n("span", null, o(a(s).label("停用后仍会保留，之后可以重新开启", "Disabled jobs stay available and can be resumed later")), 1)
              ]),
              n("article", Kp, [
                n("p", zp, o(a(s).label("调度器状态", "Scheduler")), 1),
                n("strong", null, o(te(a(f).data.status.enabled)), 1),
                n("span", null, o(a(f).data.status.schedulerNextWakeAt ? a(st)(a(f).data.status.schedulerNextWakeAt) : a(f).data.status.storePath || a(s).label("暂未返回调度器路径", "No scheduler path reported yet")), 1)
              ]),
              n("article", qp, [
                n("p", Jp, o(a(s).label("运行态任务数", "Runtime job count")), 1),
                n("strong", null, o(a(he)(a(f).data.status.jobsCount)), 1),
                n("span", null, o(a(s).label("来自 openclaw cron status 的运行态统计", "Reported directly by openclaw cron status")), 1)
              ]),
              n("article", Qp, [
                n("p", Yp, o(a(s).label("分页窗口", "Pagination window")), 1),
                n("strong", null, o(a(he)(a(f).data.offset)) + " / " + o(a(he)(a(f).data.limit)), 1),
                n("span", null, o(a(f).data.hasMore ? a(s).label(`还有更多任务未加载，nextOffset=${a(f).data.nextOffset ?? "-"}`, `More jobs remain, nextOffset=${a(f).data.nextOffset ?? "-"}`) : a(s).label("当前页已经完整", "The current page is complete")), 1)
              ])
            ]),
            a(f).error ? (m(), v("div", Zp, o(a(s).label("已保留上一版成功结果，同时后台刷新失败：", "The last successful result is still on screen, but the background refresh failed: ")) + o(a(f).error), 1)) : ue("", !0)
          ]),
          _: 1
        }, 8, ["title"]),
        h.value ? (m(), He(oe, {
          key: 0,
          title: a(s).label("最近一次任务操作", "Latest task action"),
          eyebrow: "Action"
        }, {
          default: le(() => [
            n("div", {
              class: ge(["status-banner", h.value.tone === "success" ? "status-banner--success" : "status-banner--error"])
            }, [
              n("strong", null, o(h.value.message), 1),
              n("span", null, o(a(st)(h.value.at)), 1)
            ], 2),
            a(s).developerMode && h.value.detail ? (m(), v("pre", Xp, o(h.value.detail), 1)) : h.value.detail ? (m(), v("p", eh, o(a(s).label("最近一次任务动作的原始 detail 已收纳到开发者模式里。需要查看底层返回内容时，请先到 Settings 打开开发者模式。", "The raw detail from the latest task action now stays behind developer mode. Enable it from Settings if you need the underlying payload.")), 1)) : ue("", !0)
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
          Z(oe, {
            title: c.value === "edit" ? a(s).label(`编辑任务 ${u.value}`, `Edit ${u.value}`) : a(s).label("新建 Cron 任务", "Create cron job"),
            eyebrow: "Editor"
          }, {
            default: le(() => [
              n("div", lh, [
                n("p", ah, o(a(s).label("这里直接复用现有的 cron-ui 接口，所以保存后的任务会立即回到同一套运行态里，不会产生第二套自动化系统。", "This editor talks to the existing cron-ui API directly, so saved jobs go back into the same runtime immediately instead of creating a second automation system.")), 1),
                n("span", {
                  class: ge(["pill", c.value === "edit" ? "pill--warning" : "pill--success"])
                }, o(c.value === "edit" ? a(s).label("编辑模式", "Edit mode") : a(s).label("创建模式", "Create mode")), 3)
              ]),
              n("form", {
                class: "page-form-stack",
                onSubmit: _s(me, ["prevent"])
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
                      placeholder: $()
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
                  onClick: me
                }, o(d.value === "create" || d.value === "update" ? a(s).label("保存中…", "Saving…") : c.value === "edit" ? a(s).label("保存修改", "Save changes") : a(s).label("创建任务", "Create job")), 9, Fh),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  onClick: M
                }, o(c.value === "edit" ? a(s).label("切回创建模式", "Switch to create mode") : a(s).label("重置表单", "Reset form")), 1)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          Z(oe, {
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
                  class: ge(["pill-button", { "pill-button--active": r.value === "all" }]),
                  type: "button",
                  onClick: k[18] || (k[18] = (P) => r.value = "all")
                }, o(a(s).label(`全部 (${g.value.length})`, `All (${g.value.length})`)), 3),
                n("button", {
                  class: ge(["pill-button", { "pill-button--active": r.value === "enabled" }]),
                  type: "button",
                  onClick: k[19] || (k[19] = (P) => r.value = "enabled")
                }, o(a(s).label(`启用中 (${_.value.length})`, `Enabled (${_.value.length})`)), 3),
                n("button", {
                  class: ge(["pill-button", { "pill-button--active": r.value === "disabled" }]),
                  type: "button",
                  onClick: k[20] || (k[20] = (P) => r.value = "disabled")
                }, o(a(s).label(`已停用 (${w.value.length})`, `Disabled (${w.value.length})`)), 3)
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
                      class: ge(["pill", A(P)])
                    }, o(J(P)), 3)
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
    const s = je(), l = at(() => sg(), t, { immediate: !1 }), i = K(() => {
      var c, u;
      const r = (u = (c = l.data) == null ? void 0 : c.overview) == null ? void 0 : u.risks;
      return Array.isArray(r) ? r : [];
    });
    return Me(() => l.data, (r) => {
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
        Z(oe, {
          title: a(s).label("当前可用性", "Current availability"),
          eyebrow: "Status"
        }, {
          default: le(() => {
            var u, d, h, f, p, g, _, w, x, H;
            return [
              n("div", pg, [
                n("article", hg, [
                  c[1] || (c[1] = n("p", { class: "stat-card__label" }, "Guard", -1)),
                  n("strong", null, o(((u = a(l).data.info) == null ? void 0 : u.guardVersion) || "unknown"), 1),
                  n("span", null, o(((d = a(l).data.info) == null ? void 0 : d.platform) || "unknown platform"), 1)
                ]),
                n("article", gg, [
                  c[2] || (c[2] = n("p", { class: "stat-card__label" }, "OpenClaw", -1)),
                  n("strong", null, o((f = (h = a(l).data.info) == null ? void 0 : h.openclaw) != null && f.installed ? ((g = (p = a(l).data.info) == null ? void 0 : p.openclaw) == null ? void 0 : g.version) || "installed" : a(s).label("未安装", "Not installed")), 1),
                  n("span", null, o(((w = (_ = a(l).data.info) == null ? void 0 : _.openclaw) == null ? void 0 : w.detectedSource) || a(s).label("待检测", "Pending detection")), 1)
                ]),
                n("article", _g, [
                  n("p", mg, o(a(s).label("Node 运行时", "Node runtime")), 1),
                  n("strong", null, o(((x = a(l).data.info) == null ? void 0 : x.nodeVersion) || "unknown"), 1),
                  n("span", null, o(((H = a(l).data.info) == null ? void 0 : H.user) || a(s).label("用户未知", "Unknown user")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        Z(oe, {
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
                Z(a(Rl), {
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
        Z(oe, {
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
        class: ge(["page-tabs__button", { "page-tabs__button--active": r.id === e.activeId }]),
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
  const e = /* @__PURE__ */ B("all"), t = /* @__PURE__ */ B(""), s = /* @__PURE__ */ B(""), l = /* @__PURE__ */ B(""), i = /* @__PURE__ */ B("all"), r = /* @__PURE__ */ B(""), c = /* @__PURE__ */ B(""), u = /* @__PURE__ */ B(null);
  function d(O) {
    e.value = O;
  }
  function h(O) {
    t.value = O;
  }
  function f(O) {
    s.value = O, O && (t.value = As(O) || t.value);
  }
  function p(O) {
    l.value = O;
  }
  function g(O) {
    i.value = O;
  }
  function _(O) {
    r.value = O;
  }
  function w(O) {
    c.value = O;
  }
  function x(O) {
    const M = nl(O) ? "memory" : "all";
    u.value = {
      path: O,
      mode: M,
      parentPath: As(O)
    }, e.value = M, M === "memory" ? l.value = O : (s.value = O, t.value = As(O) || t.value);
  }
  function H() {
    const O = u.value;
    return u.value = null, O;
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
    setCurrentPath: h,
    setSelectedFilePath: f,
    setSelectedMemoryFilePath: p,
    setMemoryKindFilter: g,
    setMemoryFilterQuery: _,
    setSearchQuery: w,
    requestReveal: x,
    consumeReveal: H
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
    const t = je(), s = it(), l = Tl(), i = /* @__PURE__ */ B(!0), r = /* @__PURE__ */ B(!1), c = /* @__PURE__ */ B(!1), u = /* @__PURE__ */ B(!1), d = /* @__PURE__ */ B(null), h = /* @__PURE__ */ B(null), f = /* @__PURE__ */ B(null), p = /* @__PURE__ */ B([]), g = /* @__PURE__ */ B(null), _ = /* @__PURE__ */ B(""), w = /* @__PURE__ */ B(""), x = /* @__PURE__ */ B(null), H = /* @__PURE__ */ B(""), O = /* @__PURE__ */ B(""), M = /* @__PURE__ */ B(!1), I = /* @__PURE__ */ B(!1), j = /* @__PURE__ */ B("file"), te = /* @__PURE__ */ B(""), J = K(() => [
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
    ]), A = K(() => l.mode === "memory" ? h.value : d.value), $ = K(() => {
      var R;
      return ((R = f.value) == null ? void 0 : R.roots) || [];
    }), C = K(() => {
      var R;
      return ((R = f.value) == null ? void 0 : R.entries) || [];
    }), T = K(() => {
      var R;
      return ((R = f.value) == null ? void 0 : R.currentPath) || l.currentPath;
    }), ce = K(() => {
      var R;
      return ((R = f.value) == null ? void 0 : R.parentPath) || null;
    }), re = K(() => $.value.filter((R) => T.value === R.path || T.value.startsWith(`${R.path}\\`) || T.value.startsWith(`${R.path}/`)).sort((R, F) => F.path.length - R.path.length)[0] || null), me = K(() => C.value.filter((R) => R.isDirectory).length), Re = K(() => C.value.length - me.value), Ee = K(() => p.value), V = K(() => {
      const R = l.memoryFilterQuery.trim().toLowerCase();
      return Ee.value.filter((F) => l.memoryKindFilter !== "all" && be(F) !== l.memoryKindFilter ? !1 : R ? [
        F.agentId,
        F.type,
        F.relativePath,
        F.path
      ].join(" ").toLowerCase().includes(R) : !0).sort((F, E) => {
        const ne = String(F.agentId || "").localeCompare(String(E.agentId || ""));
        if (ne !== 0) return ne;
        const ve = be(F).localeCompare(be(E));
        return ve !== 0 ? ve : z(F).localeCompare(z(E));
      });
    }), k = K(() => {
      var F;
      const R = /* @__PURE__ */ new Map();
      for (const E of V.value) {
        const ne = String(E.agentId || "");
        R.has(ne) || R.set(ne, []), (F = R.get(ne)) == null || F.push(E);
      }
      return Array.from(R.entries()).map(([E, ne]) => ({
        agentId: E,
        label: W(E),
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
    function W(R) {
      if (!R) return t.label("未分组", "Ungrouped");
      if (!R.startsWith("detected:")) return R;
      const F = R.slice(9) || "workspace";
      return t.label(`自动发现：${F}`, `Auto-detected: ${F}`);
    }
    function z(R) {
      if (R.type === "memory") {
        const F = R.relativePath.split(/[\\/]/);
        return F[F.length - 1] || R.relativePath;
      }
      return R.type;
    }
    function ae(R) {
      return R === "file" ? g.value !== null && P(_.value) !== w.value : x.value !== null && P(H.value) !== O.value;
    }
    async function Se(R) {
      if (!ae(R)) return !0;
      const F = R === "memory";
      return s.confirm({
        title: t.label(F ? "切换记忆文件" : "切换文件", F ? "Switch memory file" : "Switch file"),
        message: t.label(
          F ? "当前记忆编辑器里有未保存修改，继续切换会丢失这些内容。" : "当前文件编辑器里有未保存修改，继续切换会丢失这些内容。",
          F ? "There are unsaved changes in the memory editor. Switching now discards them." : "There are unsaved changes in the file editor. Switching now discards them."
        ),
        confirmLabel: t.label("放弃并继续", "Discard and continue"),
        cancelLabel: t.label("取消", "Cancel"),
        tone: "danger"
      });
    }
    async function Ge(R, F = !1) {
      F || (r.value = !0), d.value = null;
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
      R || (c.value = !0), h.value = null;
      try {
        const F = await Pg();
        p.value = F.files || [];
      } catch (F) {
        h.value = F instanceof Error ? F.message : String(F);
      } finally {
        c.value = !1;
      }
    }
    async function N(R, F = !0) {
      if (F && !await Se("file")) return !1;
      u.value = !0;
      try {
        const E = await La(R);
        return g.value = E, _.value = E.content || "", w.value = P(E.content || ""), l.setSelectedFilePath(R), !0;
      } catch (E) {
        return s.pushToast({
          tone: "error",
          message: E instanceof Error ? E.message : String(E)
        }), !1;
      } finally {
        u.value = !1;
      }
    }
    async function ie(R, F = !0) {
      if (F && !await Se("memory")) return !1;
      u.value = !0;
      try {
        const E = await La(R);
        return x.value = E, H.value = E.content || "", O.value = P(E.content || ""), l.setSelectedMemoryFilePath(R), !0;
      } catch (E) {
        return s.pushToast({
          tone: "error",
          message: E instanceof Error ? E.message : String(E)
        }), !1;
      } finally {
        u.value = !1;
      }
    }
    async function ee() {
      const R = l.currentPath || As(l.selectedFilePath) || void 0;
      await Ge(R, !0), l.selectedFilePath && await N(l.selectedFilePath, !1);
    }
    async function de() {
      await We(!0), l.selectedMemoryFilePath && await ie(l.selectedMemoryFilePath, !1);
    }
    async function ke(R, F, E = !0) {
      if (F === "memory") {
        if (l.mode === "all" && E && !await Se("file")) return;
        l.setMode("memory"), await We(!0), R && await ie(R, !1);
        return;
      }
      l.mode === "memory" && E && !await Se("memory") || (l.setMode("all"), await Ge(As(R) || l.currentPath || void 0, !0), R && await N(R, !1));
    }
    async function b(R) {
      var ne, ve;
      const F = R === "memory" ? "memory" : "all";
      if (F === l.mode) return;
      const E = F === "memory" ? l.selectedMemoryFilePath || ((ne = x.value) == null ? void 0 : ne.path) || "" : l.selectedFilePath || ((ve = g.value) == null ? void 0 : ve.path) || "";
      await ke(E, F, !0), F === "all" && !E && (l.setMode("all"), await Ge(l.currentPath || void 0, !0)), F === "memory" && !E && (l.setMode("memory"), await We(!0));
    }
    async function y(R) {
      if (R.isDirectory) {
        if (!await Se("file")) return;
        g.value = null, _.value = "", w.value = "", l.setSelectedFilePath(""), await Ge(R.path);
        return;
      }
      await N(R.path, !0);
    }
    async function S(R) {
      await Se("file") && (g.value = null, _.value = "", w.value = "", l.setSelectedFilePath(""), await Ge(R));
    }
    async function D() {
      ce.value && await Se("file") && (g.value = null, _.value = "", w.value = "", l.setSelectedFilePath(""), await Ge(ce.value));
    }
    async function U() {
      await Ge(T.value || void 0, !0);
    }
    async function L() {
      var R;
      (R = g.value) != null && R.path && await N(g.value.path, !0);
    }
    async function X() {
      var R;
      (R = x.value) != null && R.path && await ie(x.value.path, !0);
    }
    async function Q(R) {
      const F = R === "file" ? g.value : x.value, E = R === "file" ? _.value : H.value;
      if (F != null && F.path) {
        M.value = !0;
        try {
          const ne = await Tg(F.path, E);
          s.pushToast({
            tone: ne.success ? "success" : "error",
            message: ne.message
          }), ne.success && (R === "file" ? (w.value = P(E), g.value && (g.value.content = E), await Ge(T.value || void 0, !0)) : (O.value = P(E), x.value && (x.value.content = E), await We(!0)));
        } catch (ne) {
          s.pushToast({
            tone: "error",
            message: ne instanceof Error ? ne.message : String(ne)
          });
        } finally {
          M.value = !1;
        }
      }
    }
    async function q() {
      const R = T.value;
      if (!R) return;
      const F = te.value.trim();
      if (!F) {
        s.pushToast({
          tone: "warning",
          message: t.label("请输入要创建的文件名或目录名。", "Enter the file or directory name first.")
        });
        return;
      }
      I.value = !0;
      try {
        const E = await Ag(R, F, j.value);
        s.pushToast({
          tone: E.success ? "success" : "error",
          message: E.message
        }), E.success && (te.value = "", await Ge(R, !0), j.value === "file" && E.path && await N(E.path, !1));
      } catch (E) {
        s.pushToast({
          tone: "error",
          message: E instanceof Error ? E.message : String(E)
        });
      } finally {
        I.value = !1;
      }
    }
    function G(R) {
      l.setMemoryKindFilter(R === "docs" || R === "notes" ? R : "all");
    }
    async function pe() {
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
      l.mode === "memory" ? await de() : await ee(), i.value = !1;
    }
    return ze(() => {
      se();
    }), (R, F) => (m(), v("div", Og, [
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
      Z(Sn, {
        items: J.value,
        "active-id": a(l).mode,
        onChange: b
      }, null, 8, ["items", "active-id"]),
      i.value ? (m(), v("div", Lg, o(a(t).label("正在恢复文件视图…", "Restoring the workspace view…")), 1)) : A.value && (a(l).mode === "all" && !f.value || a(l).mode === "memory" && !p.value.length) ? (m(), v("div", Fg, o(A.value), 1)) : a(l).mode === "all" ? (m(), v(Y, { key: 2 }, [
        Z(oe, {
          title: a(t).label("当前目录概览", "Current directory overview"),
          eyebrow: "Summary"
        }, {
          default: le(() => {
            var E, ne, ve;
            return [
              n("div", Ug, [
                n("article", Vg, [
                  n("p", Gg, o(a(t).label("受控根目录", "Managed roots")), 1),
                  n("strong", null, o(a(he)($.value.length)), 1),
                  n("span", null, o(((E = re.value) == null ? void 0 : E.label) || a(t).label("当前正在受控范围内浏览", "Browsing inside the managed scope now")), 1)
                ]),
                n("article", Bg, [
                  n("p", Hg, o(a(t).label("当前目录内容", "Current entries")), 1),
                  n("strong", null, o(a(he)(C.value.length)), 1),
                  n("span", null, o(`${a(he)(me.value)} ${a(t).label("个目录", "dirs")} / ${a(he)(Re.value)} ${a(t).label("个文件", "files")}`), 1)
                ]),
                n("article", jg, [
                  n("p", Wg, o(a(t).label("当前打开文件", "Open file")), 1),
                  n("strong", null, o(g.value ? "1" : "0"), 1),
                  n("span", null, o(((ne = g.value) == null ? void 0 : ne.relativePath) || a(t).label("还没有打开文件", "No file opened yet")), 1)
                ]),
                n("article", Kg, [
                  n("p", zg, o(a(t).label("当前路径", "Current path")), 1),
                  n("strong", null, o(((ve = re.value) == null ? void 0 : ve.type) === "detected-workspace" ? a(t).label("自动发现", "Auto-detected") : a(t).label("受控目录", "Managed")), 1),
                  n("span", null, o(T.value || a(t).label("等待路径返回", "Waiting for a resolved path")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        n("div", qg, [
          Z(oe, {
            title: a(t).label("工作区浏览器", "Workspace browser"),
            eyebrow: "Browser"
          }, {
            default: le(() => [
              n("div", Jg, [
                n("div", Qg, [
                  (m(!0), v(Y, null, we($.value, (E) => (m(), v("button", {
                    key: E.id,
                    class: ge(["catalog-list__item", { "catalog-list__item--active": T.value === E.path || T.value.startsWith(`${E.path}\\`) || T.value.startsWith(`${E.path}/`) }]),
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
                    n("p", null, o(T.value || "-"), 1)
                  ])
                ]),
                n("div", n_, [
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: !ce.value,
                    onClick: D
                  }, o(a(t).label("返回上一级", "Go up")), 9, l_),
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: U
                  }, o(r.value ? a(t).label("刷新中…", "Refreshing…") : a(t).label("刷新目录", "Reload list")), 1)
                ]),
                n("div", a_, [
                  $e(n("select", {
                    "onUpdate:modelValue": F[0] || (F[0] = (E) => j.value = E),
                    class: "settings-input create-row__kind"
                  }, [
                    n("option", i_, o(a(t).label("文件", "File")), 1),
                    n("option", o_, o(a(t).label("目录", "Directory")), 1)
                  ], 512), [
                    [ft, j.value]
                  ]),
                  $e(n("input", {
                    "onUpdate:modelValue": F[1] || (F[1] = (E) => te.value = E),
                    class: "settings-input",
                    type: "text",
                    placeholder: a(t).label("例如：README-local.md 或 drafts", "Example: README-local.md or drafts"),
                    onKeydown: Vc(_s(q, ["prevent"]), ["enter"])
                  }, null, 40, r_), [
                    [Ne, te.value]
                  ]),
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: I.value,
                    onClick: q
                  }, o(I.value ? a(t).label("创建中…", "Creating…") : a(t).label("创建", "Create")), 9, c_)
                ]),
                C.value.length ? (m(), v("div", u_, [
                  (m(!0), v(Y, null, we(C.value, (E) => {
                    var ne;
                    return m(), v("button", {
                      key: E.path,
                      class: ge(["entry-button", { "entry-button--active": ((ne = g.value) == null ? void 0 : ne.path) === E.path }]),
                      type: "button",
                      onClick: (ve) => y(E)
                    }, [
                      n("div", f_, [
                        n("strong", null, o(E.isDirectory ? `${a(t).label("[目录]", "[DIR]")} ${E.name}` : E.name), 1)
                      ]),
                      n("p", null, o(E.relativePath || E.path), 1),
                      n("div", p_, [
                        n("span", {
                          class: ge(["pill", E.isDirectory ? "pill--info" : "pill--muted"])
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
          Z(oe, {
            title: a(t).label("文件编辑器", "File editor"),
            eyebrow: "Editor"
          }, {
            default: le(() => [
              u.value ? (m(), v("div", __, o(a(t).label("正在读取文件内容…", "Loading file content…")), 1)) : g.value ? (m(), v(Y, { key: 1 }, [
                n("div", m_, [
                  n("div", b_, [
                    n("strong", null, o(g.value.relativePath || g.value.path), 1),
                    n("p", null, o(g.value.path), 1),
                    g.value.truncated ? (m(), v("p", v_, o(a(t).label("文件内容过长，当前只预览了前一部分。", "This file is large, so only the first portion is loaded for preview and editing.")), 1)) : ue("", !0)
                  ])
                ]),
                n("div", y_, [
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: L
                  }, o(a(t).label("重新读取", "Reload")), 1),
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: M.value,
                    onClick: F[2] || (F[2] = (E) => Q("file"))
                  }, o(M.value ? a(t).label("保存中…", "Saving…") : a(t).label("保存文件", "Save file")), 9, w_)
                ]),
                $e(n("textarea", {
                  "onUpdate:modelValue": F[3] || (F[3] = (E) => _.value = E),
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
        Z(oe, {
          title: a(t).label("核心记忆概览", "Core memory overview"),
          eyebrow: "Summary"
        }, {
          default: le(() => {
            var E;
            return [
              n("div", k_, [
                n("article", S_, [
                  n("p", C_, o(a(t).label("记忆文件数", "Memory files")), 1),
                  n("strong", null, o(a(he)(Ee.value.length)), 1),
                  n("span", null, o(`${a(he)(Ee.value.filter((ne) => ne.type !== "memory").length)} ${a(t).label("个核心文档", "core docs")} / ${a(he)(Ee.value.filter((ne) => ne.type === "memory").length)} ${a(t).label("个记忆片段", "memory notes")}`), 1)
                ]),
                n("article", x_, [
                  n("p", R_, o(a(t).label("覆盖角色", "Covered roles")), 1),
                  n("strong", null, o(a(he)(k.value.length)), 1),
                  n("span", null, o(a(t).label("包含可管理记忆文件的角色或工作区", "Roles or workspaces that already have managed memory files")), 1)
                ]),
                n("article", E_, [
                  n("p", T_, o(a(t).label("当前显示", "Visible now")), 1),
                  n("strong", null, o(a(he)(V.value.length)), 1),
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
          Z(oe, {
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
                  onInput: F[4] || (F[4] = (E) => a(l).setMemoryFilterQuery(E.target.value))
                }, null, 40, I_)
              ]),
              n("div", N_, [
                (m(), v(Y, null, we(["all", "docs", "notes"], (E) => n("button", {
                  key: E,
                  class: ge(["pill-button", { "pill-button--active": a(l).memoryKindFilter === E }]),
                  type: "button",
                  onClick: (ne) => G(E)
                }, [
                  n("span", null, o(fe(E)), 1)
                ], 10, D_)), 64))
              ]),
              n("p", L_, o(a(t).label(`当前显示 ${a(he)(V.value.length)} / ${a(he)(Ee.value.length)} 个记忆文件。`, `Showing ${a(he)(V.value.length)} of ${a(he)(Ee.value.length)} memory files.`)), 1),
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
                      n("span", H_, o(a(he)(E.files.length)), 1),
                      n("span", j_, o(`${fe("docs")} ${a(he)(E.docsCount)}`), 1),
                      n("span", W_, o(`${fe("notes")} ${a(he)(E.notesCount)}`), 1)
                    ])
                  ]),
                  n("div", K_, [
                    (m(!0), v(Y, null, we(E.files, (ne) => {
                      var ve;
                      return m(), v("button", {
                        key: ne.path,
                        class: ge(["entry-button", { "entry-button--active": ((ve = x.value) == null ? void 0 : ve.path) === ne.path }]),
                        type: "button",
                        onClick: (Ye) => ie(ne.path)
                      }, [
                        n("div", q_, [
                          n("strong", null, o(z(ne)), 1)
                        ]),
                        n("p", null, o(ne.relativePath || ne.path), 1),
                        n("div", J_, [
                          n("span", {
                            class: ge(["pill", be(ne) === "docs" ? "pill--info" : "pill--success"])
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
          Z(oe, {
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
                    onClick: X
                  }, o(a(t).label("重新读取", "Reload")), 1),
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: pe
                  }, o(a(t).label("在全部文件中定位", "Reveal in all files")), 1),
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: M.value,
                    onClick: F[5] || (F[5] = (E) => Q("memory"))
                  }, o(M.value ? a(t).label("保存中…", "Saving…") : a(t).label("保存记忆文件", "Save memory file")), 9, sm)
                ]),
                $e(n("textarea", {
                  "onUpdate:modelValue": F[6] || (F[6] = (E) => H.value = E),
                  class: "settings-textarea settings-textarea--editor",
                  rows: "22"
                }, null, 512), [
                  [Ne, H.value]
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
    const s = je(), l = it(), i = /* @__PURE__ */ B((t == null ? void 0 : t.requestedLines) || 200), r = at(() => am(i.value), t, { immediate: !1 }), c = [100, 200, 500], u = K(() => {
      var p;
      return ((p = r.data) == null ? void 0 : p.logs) || [];
    }), d = K(() => /^(获取日志失败|Failed to fetch logs)/.test(u.value[0] || ""));
    Me(() => r.data, (p) => {
      p && (t = p);
    }), ze(() => {
      r.execute({ silent: !!r.data });
    });
    async function h(p) {
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
    return (p, g) => (m(), v("div", im, [
      n("header", om, [
        n("div", null, [
          n("p", rm, o(a(s).label("日志 / Fourth slice", "Logs / Fourth slice")), 1),
          n("h2", cm, o(a(s).label("日志与排障", "Logs & troubleshooting")), 1),
          n("p", um, o(a(s).label("先把最常用的 Gateway 日志排障入口迁进新壳层里，支持切换日志行数、静默刷新和快速复制，避免排障时还要跳回旧控制台。", "Bring the most-used Gateway log workflow into the new shell first, with line-count switching, silent refresh, and quick copy so troubleshooting no longer depends on the old console.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: g[0] || (g[0] = (_) => h())
        }, o(a(r).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新日志", "Refresh logs")), 1)
      ]),
      a(r).loading && !a(r).data ? (m(), v("div", dm, o(a(s).label("正在读取最近日志…", "Loading the latest log lines…")), 1)) : a(r).error && !a(r).data ? (m(), v("div", fm, o(a(r).error), 1)) : a(r).data ? (m(), v(Y, { key: 2 }, [
        Z(oe, {
          title: a(s).label("日志概览", "Log overview"),
          eyebrow: "Gateway"
        }, {
          default: le(() => [
            n("div", pm, [
              n("article", hm, [
                n("p", gm, o(a(s).label("日志来源", "Source")), 1),
                g[1] || (g[1] = n("strong", null, "Gateway", -1)),
                n("span", null, o(a(s).label("当前先迁移最常用的 Gateway 日志入口", "The first migrated source is the Gateway log stream")), 1)
              ]),
              n("article", _m, [
                n("p", mm, o(a(s).label("请求行数", "Requested lines")), 1),
                n("strong", null, o(a(he)(a(r).data.requestedLines)), 1),
                n("span", null, o(a(s).label("切换后会静默拉取新结果", "Changing this refreshes the result silently")), 1)
              ]),
              n("article", bm, [
                n("p", vm, o(a(s).label("返回行数", "Returned lines")), 1),
                n("strong", null, o(a(he)(u.value.length)), 1),
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
        Z(oe, {
          title: a(s).label("最近日志输出", "Latest log output"),
          eyebrow: "Output"
        }, {
          actions: le(() => [
            n("div", km, [
              (m(), v(Y, null, we(c, (_) => n("button", {
                key: _,
                class: ge(["pill-button", { "pill-button--active": i.value === _ }]),
                type: "button",
                onClick: (w) => h(_)
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
    const l = je(), i = it(), r = at(() => Em(), s, { immediate: !1 }), c = /* @__PURE__ */ B("__new__"), u = /* @__PURE__ */ B(!1), d = /* @__PURE__ */ B(!1), h = /* @__PURE__ */ B(!1), f = /* @__PURE__ */ B(""), p = /* @__PURE__ */ B([]), g = /* @__PURE__ */ Ft({
      mode: "new",
      title: "",
      canDelete: !1,
      name: "",
      baseUrl: "",
      apiType: "openai-completions",
      apiKey: "",
      apiKeyHelp: "",
      modelsText: ""
    }), _ = K(() => {
      const A = r.data, $ = (A == null ? void 0 : A.config.providers) || [], C = (A == null ? void 0 : A.catalog.presets) || [];
      return [
        { value: "__new__", label: l.label("新建空白 Provider", "Create blank provider"), kind: "new" },
        ...$.map((T) => ({
          value: T.name,
          label: `${T.name} · ${l.label("已配置", "configured")}`,
          kind: "custom"
        })),
        ...C.filter((T) => !$.some((ce) => ce.name === T.id)).map((T) => ({
          value: T.id,
          label: `${T.id} · ${l.label("预设", "preset")}`,
          kind: "preset"
        }))
      ];
    }), w = K(() => {
      var $;
      return ((($ = r.data) == null ? void 0 : $.config.providers) || []).flatMap((C) => C.models.map((T) => ({
        providerName: C.name,
        fullId: T.fullId,
        name: T.name,
        api: T.api
      })));
    });
    function x(A, $) {
      return A.map((C) => [
        C.id || "",
        C.name || C.id || "",
        C.contextWindow || "",
        C.maxTokens || "",
        C.api || $ || ""
      ].join("|")).join(`
`);
    }
    function H(A, $) {
      return A.split(/\r?\n/).map((C) => C.trim()).filter(Boolean).map((C) => {
        const [T, ce, re, me, Re] = C.split("|").map((Ee) => Ee.trim());
        return {
          id: T,
          name: ce || T,
          contextWindow: ln(re),
          maxTokens: ln(me),
          api: Re || $ || void 0
        };
      }).filter((C) => C.id);
    }
    function O(A) {
      var Ee, V;
      const $ = r.data;
      if (!$) return;
      const C = $.config.providers, T = new Map(C.map((k) => [k.name, k])), ce = new Map(($.catalog.custom || []).map((k) => [k.name, k])), re = new Map(($.catalog.presets || []).map((k) => [k.id, k]));
      if (!A || A === "__new__") {
        g.mode = "new", g.title = l.label("新建 Provider", "Create provider"), g.canDelete = !1, g.name = "", g.baseUrl = "", g.apiType = "openai-completions", g.apiKey = "", g.apiKeyHelp = l.label("保存后写入 openclaw.json。", "Saved into openclaw.json after you confirm."), g.modelsText = "";
        return;
      }
      const me = ce.get(A);
      if (me) {
        const k = T.get(A);
        g.mode = "custom", g.title = l.label("编辑已配置 Provider", "Edit configured provider"), g.canDelete = !0, g.name = A, g.baseUrl = me.baseUrl || "", g.apiType = me.apiType || me.api || ((V = (Ee = me.models) == null ? void 0 : Ee[0]) == null ? void 0 : V.api) || "openai-completions", g.apiKey = "", g.apiKeyHelp = k != null && k.apiKeyMasked ? l.label(`留空会保留现有密钥：${k.apiKeyMasked}`, `Leave blank to keep the current key: ${k.apiKeyMasked}`) : l.label("填写后会覆盖当前密钥。", "A filled value replaces the current key."), g.modelsText = x(me.models || [], g.apiType);
        return;
      }
      const Re = re.get(A);
      if (Re) {
        g.mode = "preset", g.title = l.label("从预设带入 Provider", "Bootstrap provider from preset"), g.canDelete = !1, g.name = Re.id, g.baseUrl = Re.defaultBaseUrl || "", g.apiType = Re.apiType || "openai-completions", g.apiKey = "", g.apiKeyHelp = Re.requiresApiKey ? l.label("保存前请填写 API Key。", "Fill in the API key before saving.") : l.label("这个 Provider 通常不需要 API Key。", "This provider usually does not require an API key."), g.modelsText = x(
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
    Me(
      () => r.data,
      (A) => {
        var C;
        if (A && (s = A), !A) return;
        f.value = A.config.primaryModel || "", p.value = [...A.config.fallbackModels || []];
        const $ = _.value;
        if (!$.some((T) => T.value === c.value)) {
          c.value = ((C = $[1]) == null ? void 0 : C.value) || "__new__";
          return;
        }
        O(c.value);
      },
      { immediate: !0 }
    ), Me(c, (A) => {
      O(A);
    }), ze(() => {
      r.execute({ silent: !!r.data });
    });
    async function M() {
      u.value = !0;
      try {
        const A = await Pm(f.value);
        if (!A.success)
          throw new Error(A.message);
        const $ = await Om(p.value.filter((C) => C !== f.value));
        if (!$.success)
          throw new Error($.message);
        i.pushToast({
          tone: "success",
          message: l.label("模型路由已更新。", "Model routing was updated.")
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
    async function I() {
      d.value = !0;
      try {
        const A = await Tm({
          name: g.name.trim(),
          baseUrl: g.baseUrl.trim(),
          apiKey: g.apiKey.trim() || void 0,
          apiType: g.apiType,
          models: H(g.modelsText, g.apiType)
        });
        i.pushToast({
          tone: A.success ? "success" : "error",
          message: A.message
        }), A.success && (c.value = g.name.trim() || "__new__", await r.execute({ silent: !0 }));
      } catch (A) {
        i.pushToast({
          tone: "error",
          message: A instanceof Error ? A.message : String(A)
        });
      } finally {
        d.value = !1;
      }
    }
    async function j() {
      if (!(!g.canDelete || !g.name || !await i.confirm({
        title: l.label("删除 Provider", "Delete provider"),
        message: l.label(
          `确认删除 ${g.name} 吗？这会同时移除它的模型定义、主模型引用和备用链路。`,
          `Delete ${g.name}? This also removes its model definitions, primary selection, and fallback references.`
        ),
        confirmLabel: l.label("确认删除", "Delete provider"),
        cancelLabel: l.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        h.value = !0;
        try {
          const $ = await Am(g.name);
          i.pushToast({
            tone: $.success ? "success" : "error",
            message: $.message
          }), $.success && (c.value = "__new__", await r.execute({ silent: !0 }));
        } catch ($) {
          i.pushToast({
            tone: "error",
            message: $ instanceof Error ? $.message : String($)
          });
        } finally {
          h.value = !1;
        }
      }
    }
    function te(A) {
      if (p.value.includes(A)) {
        p.value = p.value.filter(($) => $ !== A);
        return;
      }
      p.value = [...p.value, A];
    }
    function J(A, $) {
      var C;
      return A ? l.label(`预设入口：${A.name}`, `Preset source: ${A.name}`) : (C = $ == null ? void 0 : $.models) != null && C.length ? l.label(`当前已录入 ${$.models.length} 个模型`, `${$.models.length} model entries are recorded now`) : l.label("保存后就会写入当前 openclaw.json。", "Saving writes the provider into the active openclaw.json.");
    }
    return (A, $) => (m(), v("div", Mm, [
      n("header", Im, [
        n("div", null, [
          n("p", Nm, o(a(l).label("模型 / Second slice", "Models / Second slice")), 1),
          n("h2", Dm, o(a(l).label("模型策略", "Model strategy")), 1),
          n("p", Lm, o(a(l).label("把 Provider、主模型和 fallback 链迁到模块化页面里，同时保持当前 openclaw.json 的真实读写。", "Move providers, the primary model, and the fallback chain into the modular page while keeping real read-write access to the current openclaw.json.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: $[0] || ($[0] = (C) => a(r).execute({ silent: !0 }))
        }, o(a(r).refreshing ? a(l).label("刷新中…", "Refreshing…") : a(l).label("刷新", "Refresh")), 1)
      ]),
      a(r).loading && !a(r).data ? (m(), v("div", Fm, o(a(l).label("正在读取模型配置…", "Loading model configuration…")), 1)) : a(r).error && !a(r).data ? (m(), v("div", Um, o(a(r).error), 1)) : a(r).data ? (m(), v(Y, { key: 2 }, [
        a(r).error ? (m(), v("div", Vm, o(a(l).label("已保留上一版模型快照，但后台刷新失败：", "The last model snapshot is still on screen, but the background refresh failed: ")) + o(a(r).error), 1)) : ue("", !0),
        Z(oe, {
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
                n("strong", null, o(w.value.length), 1),
                n("span", null, o(a(l).label("来自当前已配置 Provider", "Collected from configured providers")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        Z(oe, {
          title: a(l).label("主模型与备用链路", "Primary and fallback chain"),
          eyebrow: "Routing editor"
        }, {
          default: le(() => [
            n("div", Qm, [
              n("label", Ym, [
                n("span", null, o(a(l).label("主模型", "Primary model")), 1),
                n("small", null, o(a(l).label("Guard 默认先走这一条模型路径。", "Guard routes here first by default.")), 1),
                $e(n("select", {
                  "onUpdate:modelValue": $[1] || ($[1] = (C) => f.value = C),
                  class: "settings-input"
                }, [
                  n("option", Zm, o(a(l).label("暂不设置", "Leave unset")), 1),
                  (m(!0), v(Y, null, we(w.value, (C) => (m(), v("option", {
                    key: C.fullId,
                    value: C.fullId
                  }, o(`${C.providerName} / ${C.name}`), 9, Xm))), 128))
                ], 512), [
                  [ft, f.value]
                ])
              ])
            ]),
            n("div", eb, [
              (m(!0), v(Y, null, we(w.value, (C) => (m(), v("label", {
                key: C.fullId,
                class: "checkbox-card"
              }, [
                n("input", {
                  checked: p.value.includes(C.fullId),
                  type: "checkbox",
                  onChange: (T) => te(C.fullId)
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
                onClick: M
              }, o(u.value ? a(l).label("保存中…", "Saving…") : a(l).label("保存路由策略", "Save routing strategy")), 9, nb)
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        n("div", lb, [
          Z(oe, {
            title: a(l).label("Provider 选择器", "Provider picker"),
            eyebrow: "Provider"
          }, {
            default: le(() => [
              n("div", ab, [
                (m(!0), v(Y, null, we(_.value, (C) => (m(), v("button", {
                  key: C.value,
                  class: ge(["catalog-list__item", { "catalog-list__item--active": c.value === C.value }]),
                  type: "button",
                  onClick: (T) => c.value = C.value
                }, [
                  n("div", ob, [
                    n("strong", null, o(C.label), 1)
                  ]),
                  n("div", rb, [
                    n("span", {
                      class: ge(["pill", C.kind === "custom" ? "pill--success" : C.kind === "preset" ? "pill--info" : "pill--muted"])
                    }, o(C.kind === "custom" ? a(l).label("已配置", "Configured") : C.kind === "preset" ? a(l).label("预设", "Preset") : a(l).label("空白", "Blank")), 3)
                  ])
                ], 10, ib))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          n("div", cb, [
            Z(oe, {
              title: g.title,
              eyebrow: "Editor"
            }, {
              default: le(() => [
                n("p", ub, o(J(a(r).data.catalog.presets.find((C) => C.id === c.value), a(r).data.catalog.custom.find((C) => C.name === c.value))), 1),
                n("div", db, [
                  n("label", fb, [
                    n("span", null, o(a(l).label("Provider 名称", "Provider name")), 1),
                    $e(n("input", {
                      "onUpdate:modelValue": $[2] || ($[2] = (C) => g.name = C),
                      class: "settings-input",
                      type: "text"
                    }, null, 512), [
                      [Ne, g.name]
                    ])
                  ]),
                  n("label", pb, [
                    $[8] || ($[8] = n("span", null, "Base URL", -1)),
                    $e(n("input", {
                      "onUpdate:modelValue": $[3] || ($[3] = (C) => g.baseUrl = C),
                      class: "settings-input",
                      type: "text"
                    }, null, 512), [
                      [Ne, g.baseUrl]
                    ])
                  ]),
                  n("label", hb, [
                    n("span", null, o(a(l).label("默认 API 类型", "Default API type")), 1),
                    $e(n("select", {
                      "onUpdate:modelValue": $[4] || ($[4] = (C) => g.apiType = C),
                      class: "settings-input"
                    }, [
                      (m(), v(Y, null, we(t, (C) => n("option", {
                        key: C,
                        value: C
                      }, o(C), 9, gb)), 64))
                    ], 512), [
                      [ft, g.apiType]
                    ])
                  ]),
                  n("label", _b, [
                    $[9] || ($[9] = n("span", null, "API Key", -1)),
                    n("small", null, o(g.apiKeyHelp), 1),
                    $e(n("input", {
                      "onUpdate:modelValue": $[5] || ($[5] = (C) => g.apiKey = C),
                      class: "settings-input",
                      type: "password"
                    }, null, 512), [
                      [Ne, g.apiKey]
                    ])
                  ]),
                  n("label", mb, [
                    n("span", null, o(a(l).label("模型列表", "Model list")), 1),
                    n("small", null, o(a(l).label("每行格式：id | 名称 | contextWindow | maxTokens | api", "One line per model: id | name | contextWindow | maxTokens | api")), 1),
                    $e(n("textarea", {
                      "onUpdate:modelValue": $[6] || ($[6] = (C) => g.modelsText = C),
                      class: "settings-textarea",
                      rows: "8"
                    }, null, 512), [
                      [Ne, g.modelsText]
                    ])
                  ])
                ]),
                n("div", bb, [
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: d.value,
                    onClick: I
                  }, o(d.value ? a(l).label("保存中…", "Saving…") : a(l).label("保存 Provider", "Save provider")), 9, vb),
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: $[7] || ($[7] = (C) => O(c.value))
                  }, o(a(l).label("恢复当前内容", "Reset draft")), 1),
                  g.canDelete ? (m(), v("button", {
                    key: 0,
                    class: "inline-link inline-link--danger",
                    type: "button",
                    disabled: h.value,
                    onClick: j
                  }, o(h.value ? a(l).label("删除中…", "Deleting…") : a(l).label("删除 Provider", "Delete provider")), 9, yb)) : ue("", !0)
                ])
              ]),
              _: 1
            }, 8, ["title"]),
            Z(oe, {
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
                      (m(!0), v(Y, null, we(C.models, (T) => (m(), v("div", {
                        key: T.fullId,
                        class: "mini-list__item"
                      }, [
                        n("div", null, [
                          n("strong", null, o(T.name), 1),
                          n("p", null, o(T.fullId), 1)
                        ]),
                        n("div", Rb, [
                          T.isPrimary ? (m(), v("span", Eb, o(a(l).label("主模型", "Primary")), 1)) : ue("", !0),
                          T.isFallback ? (m(), v("span", Tb, o(a(l).label("备用", "Fallback")), 1)) : ue("", !0)
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
    const s = je(), l = it(), i = /* @__PURE__ */ B("reminders"), r = /* @__PURE__ */ B(""), c = /* @__PURE__ */ B("all"), u = /* @__PURE__ */ B("all"), d = /* @__PURE__ */ B(20), h = /* @__PURE__ */ B(1), f = /* @__PURE__ */ B(""), p = /* @__PURE__ */ B(""), g = /* @__PURE__ */ B(""), _ = at(() => Pb(), t, { immediate: !1 }), w = [10, 20, 50], x = K(() => [
      { id: "reminders", label: s.label("提醒", "Reminders") },
      { id: "timeline", label: s.label("时间线", "Timeline") }
    ]), H = K(() => {
      var W;
      return ((W = _.data) == null ? void 0 : W.summary.items) || [];
    }), O = K(() => {
      var W;
      return ((W = _.data) == null ? void 0 : W.events) || [];
    }), M = K(() => H.value.filter((W) => W.severity === "warning" || W.severity === "error").length), I = K(() => H.value.filter((W) => W.severity === "success").length), j = K(() => Array.from(new Set(H.value.map((W) => W.source).filter(Boolean))).sort()), te = K(() => {
      const W = r.value.trim().toLowerCase();
      return H.value.filter((z) => u.value === "unread" && z.read || u.value === "warning" && z.severity !== "warning" && z.severity !== "error" || u.value === "success" && z.severity !== "success" || c.value !== "all" && z.source !== c.value ? !1 : W ? [
        z.title,
        z.message,
        z.type,
        z.source,
        JSON.stringify(z.meta || {})
      ].join(" ").toLowerCase().includes(W) : !0);
    }), J = K(() => Math.max(1, Math.ceil(te.value.length / d.value))), A = K(() => {
      const W = (h.value - 1) * d.value;
      return te.value.slice(W, W + d.value);
    }), $ = K(() => {
      var z;
      const W = /* @__PURE__ */ new Map();
      for (const ae of A.value) {
        const Se = ae.createdAt ? ae.createdAt.slice(0, 10) : "unknown";
        W.has(Se) || W.set(Se, {
          key: Se,
          label: C(ae.createdAt),
          items: []
        }), (z = W.get(Se)) == null || z.items.push(ae);
      }
      return Array.from(W.values());
    });
    Me(() => _.data, (W) => {
      W && (t = W);
    }), Me([r, c, u, d, i], () => {
      h.value = 1;
    }), Me(J, (W) => {
      h.value > W && (h.value = W);
    }), ze(() => {
      _.execute({ silent: !!_.data });
    });
    function C(W) {
      if (!W) return s.label("未知日期", "Unknown date");
      const z = Date.parse(W);
      return Number.isFinite(z) ? new Intl.DateTimeFormat(void 0, {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(new Date(z)) : W;
    }
    function T(W) {
      return W === "success" ? "pill--success" : W === "warning" ? "pill--warning" : W === "error" ? "pill--danger" : "pill--info";
    }
    function ce(W) {
      return W === "success" ? s.label("成功", "Success") : W === "warning" ? s.label("警告", "Warning") : W === "error" ? s.label("异常", "Error") : s.label("提示", "Info");
    }
    function re(W) {
      const ae = {
        cron: { zh: "自动化", en: "Automation" },
        recovery: { zh: "备份与恢复", en: "Backup & Recovery" },
        git: { zh: "Git", en: "Git" },
        "git-sync": { zh: "备份与恢复", en: "Backup & Recovery" },
        openclaw: { zh: "OpenClaw", en: "OpenClaw" },
        security: { zh: "安全", en: "Security" }
      }[W];
      return ae ? s.label(ae.zh, ae.en) : W || s.label("系统提醒", "System reminder");
    }
    function me(W) {
      const ae = {
        "session-started": { zh: "会话启动", en: "Session started" },
        "session-updated": { zh: "会话更新", en: "Session updated" },
        "session-ended": { zh: "会话结束", en: "Session ended" },
        "runtime-warning": { zh: "运行告警", en: "Runtime warning" },
        "cron-run": { zh: "自动化执行", en: "Automation run" },
        "git-sync": { zh: "备份与恢复", en: "Backup & Recovery" }
      }[W];
      return ae ? s.label(ae.zh, ae.en) : W || s.label("系统事件", "System event");
    }
    function Re(W) {
      return W ? W === "cron-ui" ? s.label("Cron 管理", "Cron management") : W === "openclaw" ? "OpenClaw" : W === "guard-ui" ? "Guard UI" : W : s.label("未知来源", "Unknown source");
    }
    function Ee(W) {
      return [W.agentId, W.modelId, W.status].filter(Boolean).join(" · ");
    }
    function V(W) {
      if (!_.data) return;
      const z = {
        ..._.data,
        summary: {
          items: Array.isArray(W.items) ? W.items : [],
          total: W.total || 0,
          unread: W.unread || 0,
          read: W.read || 0
        }
      };
      _.data = z, t = z;
    }
    async function k() {
      await _.execute({ silent: !!_.data });
    }
    async function P(W) {
      const z = !W.read;
      f.value = W.id;
      try {
        const ae = await Ob(W.id, z);
        V(ae.summary), l.pushToast({
          tone: ae.success ? "success" : "error",
          message: ae.success ? z ? s.label("已标记为已读。", "Marked as read.") : s.label("已重新标记为未读。", "Marked as unread again.") : s.label("更新提醒状态失败。", "Failed to update the reminder state.")
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
    async function be(W) {
      if (!(W === "clear-all" && !await l.confirm({
        title: s.label("清空全部通知", "Clear all reminders"),
        message: s.label("确认清空全部提醒吗？这个操作不可撤销。", "Clear all reminders? This action cannot be undone."),
        confirmLabel: s.label("确认清空", "Clear all"),
        cancelLabel: s.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        p.value = W;
        try {
          const z = await Mb(W);
          V(z.summary), l.pushToast({
            tone: z.success ? "success" : "error",
            message: z.message
          });
        } catch (z) {
          l.pushToast({
            tone: "error",
            message: z instanceof Error ? z.message : String(z)
          });
        } finally {
          p.value = "";
        }
      }
    }
    async function fe(W) {
      var z;
      if (!(typeof navigator > "u" || !((z = navigator.clipboard) != null && z.writeText))) {
        g.value = W.id;
        try {
          await navigator.clipboard.writeText(JSON.stringify(W, null, 2)), l.pushToast({
            tone: "success",
            message: s.label("提醒详情已复制。", "The reminder details have been copied.")
          });
        } finally {
          g.value = "";
        }
      }
    }
    return (W, z) => (m(), v("div", Ib, [
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
      Z(Sn, {
        items: x.value,
        "active-id": i.value,
        onChange: z[0] || (z[0] = (ae) => i.value = ae)
      }, null, 8, ["items", "active-id"]),
      a(_).loading && !a(_).data ? (m(), v("div", Ub, o(a(s).label("正在读取提醒与时间线…", "Loading reminders and timeline events…")), 1)) : a(_).error && !a(_).data ? (m(), v("div", Vb, o(a(_).error), 1)) : a(_).data ? (m(), v(Y, { key: 2 }, [
        Z(oe, {
          title: a(s).label("当前概览", "Current overview"),
          eyebrow: "Overview"
        }, {
          default: le(() => [
            n("div", Gb, [
              n("article", Bb, [
                n("p", Hb, o(a(s).label("提醒总数", "Total reminders")), 1),
                n("strong", null, o(a(he)(a(_).data.summary.total)), 1),
                n("span", null, o(a(s).label("包含已读与未读提醒", "Includes both read and unread reminders")), 1)
              ]),
              n("article", jb, [
                n("p", Wb, o(a(s).label("待处理", "Needs attention")), 1),
                n("strong", null, o(a(he)(a(_).data.summary.unread)), 1),
                n("span", null, o(a(s).label("建议先处理这些未读提醒", "Start with these unread reminders")), 1)
              ]),
              n("article", Kb, [
                n("p", zb, o(a(s).label("告警提醒", "Warnings / errors")), 1),
                n("strong", null, o(a(he)(M.value)), 1),
                n("span", null, o(a(s).label("包含 warning 与 error 两种严重级别", "Counts both warning and error severity")), 1)
              ]),
              n("article", qb, [
                n("p", Jb, o(a(s).label("时间线事件", "Timeline events")), 1),
                n("strong", null, o(a(he)(O.value.length)), 1),
                n("span", null, o(a(s).label("最近活动会从这里回放", "Recent system activity is replayed here")), 1)
              ])
            ]),
            a(_).error ? (m(), v("div", Qb, o(a(s).label("已保留上一版成功结果，同时后台刷新失败：", "The last successful result is still on screen, but the background refresh failed: ")) + o(a(_).error), 1)) : ue("", !0)
          ]),
          _: 1
        }, 8, ["title"]),
        i.value === "reminders" ? (m(), v(Y, { key: 0 }, [
          Z(oe, {
            title: a(s).label("筛选与批量操作", "Filters & bulk actions"),
            eyebrow: "Controls"
          }, {
            default: le(() => [
              n("div", Yb, [
                n("label", Zb, [
                  n("span", null, o(a(s).label("搜索", "Search")), 1),
                  $e(n("input", {
                    "onUpdate:modelValue": z[1] || (z[1] = (ae) => r.value = ae),
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
                    "onUpdate:modelValue": z[2] || (z[2] = (ae) => c.value = ae),
                    class: "settings-input"
                  }, [
                    n("option", tv, o(a(s).label("全部来源", "All sources")), 1),
                    (m(!0), v(Y, null, we(j.value, (ae) => (m(), v("option", {
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
                    "onUpdate:modelValue": z[3] || (z[3] = (ae) => d.value = ae),
                    class: "settings-input"
                  }, [
                    (m(), v(Y, null, we(w, (ae) => n("option", {
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
                  class: ge(["pill-button", { "pill-button--active": u.value === "all" }]),
                  type: "button",
                  onClick: z[4] || (z[4] = (ae) => u.value = "all")
                }, o(a(s).label(`全部 (${a(_).data.summary.total})`, `All (${a(_).data.summary.total})`)), 3),
                n("button", {
                  class: ge(["pill-button", { "pill-button--active": u.value === "unread" }]),
                  type: "button",
                  onClick: z[5] || (z[5] = (ae) => u.value = "unread")
                }, o(a(s).label(`未读 (${a(_).data.summary.unread})`, `Unread (${a(_).data.summary.unread})`)), 3),
                n("button", {
                  class: ge(["pill-button", { "pill-button--active": u.value === "warning" }]),
                  type: "button",
                  onClick: z[6] || (z[6] = (ae) => u.value = "warning")
                }, o(a(s).label(`警告 (${M.value})`, `Warning (${M.value})`)), 3),
                n("button", {
                  class: ge(["pill-button", { "pill-button--active": u.value === "success" }]),
                  type: "button",
                  onClick: z[7] || (z[7] = (ae) => u.value = "success")
                }, o(a(s).label(`成功 (${I.value})`, `Success (${I.value})`)), 3)
              ]),
              n("div", iv, [
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: p.value === "read-all",
                  onClick: z[8] || (z[8] = (ae) => be("read-all"))
                }, o(p.value === "read-all" ? a(s).label("处理中…", "Working…") : a(s).label("全部标记为已读", "Mark all as read")), 9, ov),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: p.value === "unread-all",
                  onClick: z[9] || (z[9] = (ae) => be("unread-all"))
                }, o(p.value === "unread-all" ? a(s).label("处理中…", "Working…") : a(s).label("全部重新标记为未读", "Mark all as unread")), 9, rv),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: p.value === "clear-read",
                  onClick: z[10] || (z[10] = (ae) => be("clear-read"))
                }, o(p.value === "clear-read" ? a(s).label("处理中…", "Working…") : a(s).label("清空已读提醒", "Clear read reminders")), 9, cv),
                n("button", {
                  class: "inline-link inline-link--danger",
                  type: "button",
                  disabled: p.value === "clear-all",
                  onClick: z[11] || (z[11] = (ae) => be("clear-all"))
                }, o(p.value === "clear-all" ? a(s).label("处理中…", "Working…") : a(s).label("清空全部提醒", "Clear all reminders")), 9, uv)
              ]),
              a(s).developerMode ? ue("", !0) : (m(), v("p", dv, o(a(s).label("原始提醒详情复制已收纳到开发者模式里。若要导出 JSON 详情排障，请先到 Settings 打开开发者模式。", "Raw reminder-detail copy now stays behind developer mode. Enable it from Settings if you need the JSON payload for troubleshooting.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          Z(oe, {
            title: a(s).label("提醒列表", "Reminder list"),
            eyebrow: "Reminders"
          }, {
            default: le(() => [
              te.value.length ? (m(), v("div", fv, [
                (m(!0), v(Y, null, we($.value, (ae) => (m(), v("section", {
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
                            class: ge(["pill", T(Se.severity)])
                          }, o(ce(Se.severity)), 3),
                          n("span", {
                            class: ge(["pill", Se.read ? "pill--muted" : "pill--warning"])
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
                          disabled: g.value === Se.id,
                          onClick: (Ge) => fe(Se)
                        }, o(g.value === Se.id ? a(s).label("复制中…", "Copying…") : a(s).label("复制详情", "Copy details")), 9, $v)) : ue("", !0)
                      ])
                    ]))), 128))
                  ])
                ]))), 128))
              ])) : (m(), v("div", kv, o(a(s).label("当前筛选条件下没有匹配的提醒。", "No reminders match the current filters.")), 1)),
              te.value.length ? (m(), v("div", Sv, [
                n("p", Cv, o(a(s).label(
                  `当前第 ${h.value} / ${J.value} 页，共 ${te.value.length} 条提醒`,
                  `Page ${h.value} of ${J.value}, ${te.value.length} reminders total`
                )), 1),
                n("div", xv, [
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: h.value <= 1,
                    onClick: z[12] || (z[12] = (ae) => h.value -= 1)
                  }, o(a(s).label("上一页", "Previous")), 9, Rv),
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: h.value >= J.value,
                    onClick: z[13] || (z[13] = (ae) => h.value += 1)
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
            O.value.length ? (m(), v("div", Tv, [
              (m(!0), v(Y, null, we(O.value, (ae) => (m(), v("article", {
                key: ae.id,
                class: "provider-card"
              }, [
                n("header", Av, [
                  n("div", null, [
                    n("strong", null, o(ae.title || a(s).label("系统事件", "System event")), 1),
                    n("p", null, o(a(st)(ae.createdAt)), 1)
                  ]),
                  n("span", Pv, o(me(ae.type)), 1)
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
    const s = je(), l = at(() => lg(), t, { immediate: !1 }), i = K(() => {
      var _;
      return (_ = l.data) != null && _.status && typeof l.data.status == "object" ? l.data.status : {};
    }), r = K(() => {
      var _;
      return (_ = l.data) != null && _.targets && typeof l.data.targets == "object" ? l.data.targets : {};
    }), c = K(() => i.value.installed ? String(i.value.version || s.label("已安装", "Installed")) : s.label("未安装", "Not installed")), u = K(() => String(i.value.detectedSource || s.label("待检测", "Pending detection"))), d = K(() => String(i.value.effectiveUpdater || i.value.installKind || "-")), h = K(() => String(i.value.updateChannel || "-")), f = K(() => String(i.value.latestVersion || "-")), p = K(() => i.value.installed ? i.value.updateAvailable ? s.label("当前检测到可更新版本，后续会在这里接上推荐更新与快速回退。", "An update is available. This page will next gain recommended update and quick rollback actions.") : s.label("当前版本看起来已稳定，可继续检查渠道、模型或备份与恢复设置。", "The current version looks stable. You can continue with channels, models, or backup and recovery setup.") : s.label("先完成安装或修复，再进入版本管理。", "Install or repair OpenClaw first before managing versions."));
    function g(_) {
      return JSON.stringify(_, null, 2);
    }
    return Me(() => l.data, (_) => {
      _ && (t = _);
    }), ze(() => {
      l.execute({ silent: !!l.data });
    }), (_, w) => (m(), v("div", Nv, [
      n("header", Dv, [
        n("div", null, [
          n("p", Lv, o(a(s).label("OpenClaw", "OpenClaw")), 1),
          n("h2", Fv, o(a(s).label("OpenClaw 生命周期面板", "OpenClaw lifecycle panel")), 1),
          n("p", Uv, o(a(s).label("先给出当前安装、更新方式和推荐下一步；只有在开发者模式下才显示原始状态。", "Start with the current install state, update strategy, and the best next step. Raw state stays behind developer mode.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: w[0] || (w[0] = (x) => a(l).execute({ silent: !0 }))
        }, o(a(l).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      a(l).loading && !a(l).data ? (m(), v("div", Vv, o(a(s).label("正在加载 OpenClaw 状态…", "Loading the OpenClaw status…")), 1)) : a(l).error && !a(l).data ? (m(), v("div", Gv, o(a(l).error), 1)) : a(l).data ? (m(), v(Y, { key: 2 }, [
        a(l).error ? (m(), v("div", Bv, o(a(s).label("已保留上一版 OpenClaw 快照，但后台刷新失败：", "The last OpenClaw snapshot is still on screen, but the background refresh failed: ")) + o(a(l).error), 1)) : ue("", !0),
        Z(oe, {
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
                n("strong", null, o(h.value), 1),
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
        Z(oe, {
          title: a(s).label("建议下一步", "Suggested next step"),
          eyebrow: "Next"
        }, {
          default: le(() => [
            n("div", {
              class: ge(["status-banner", { "status-banner--warning": i.value.updateAvailable === !0 }])
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
            n("pre", Xv, o(g(i.value)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : ue("", !0),
        a(s).developerMode ? (m(), He(oe, {
          key: 2,
          title: a(s).label("原始目标目录", "Raw targets catalog"),
          eyebrow: "Developer"
        }, {
          default: le(() => [
            n("pre", ey, o(g(r.value)), 1)
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
    const s = je(), l = at(() => ng(), t, { immediate: !1 }), i = K(() => {
      var _;
      return (_ = l.data) != null && _.webReport && typeof l.data.webReport == "object" ? l.data.webReport : {};
    }), r = K(() => {
      var _;
      return (_ = l.data) != null && _.services && typeof l.data.services == "object" ? l.data.services : {};
    }), c = K(() => Object.entries(r.value)), u = K(() => i.value.running === !0 ? s.label("运行中", "Running") : s.label("未运行", "Stopped")), d = K(() => String(i.value.primaryUrl || "-")), h = K(() => String(i.value.workbenchUrl || "-")), f = K(() => String(i.value.nextAction || "-")), p = K(() => {
      const _ = i.value.pid, w = i.value.port;
      return !_ && !w ? "-" : _ && w ? `PID ${_} · ${s.label("端口", "Port")} ${w}` : _ ? `PID ${_}` : `${s.label("端口", "Port")} ${w}`;
    });
    function g(_) {
      return JSON.stringify(_, null, 2);
    }
    return Me(() => l.data, (_) => {
      _ && (t = _);
    }), ze(() => {
      l.execute({ silent: !!l.data });
    }), (_, w) => (m(), v("div", ny, [
      n("header", ly, [
        n("div", null, [
          n("p", ay, o(a(s).label("运维 / First slice", "Operations / First slice")), 1),
          n("h2", iy, o(a(s).label("运行态与后台服务", "Runtime and background services")), 1),
          n("p", oy, o(a(s).label("先把运行状态、访问地址和后台托管信息迁进新壳层，原始快照只在开发者模式下显示。", "Bring runtime status, access URLs, and managed background details into the new shell first. Raw snapshots stay behind developer mode.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: w[0] || (w[0] = (x) => a(l).execute({ silent: !0 }))
        }, o(a(l).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      a(l).loading && !a(l).data ? (m(), v("div", ry, o(a(s).label("正在加载运维状态…", "Loading operations status…")), 1)) : a(l).error && !a(l).data ? (m(), v("div", cy, o(a(l).error), 1)) : a(l).data ? (m(), v(Y, { key: 2 }, [
        a(l).error ? (m(), v("div", uy, o(a(s).label("已保留上一版运维快照，但后台刷新失败：", "The last operations snapshot is still on screen, but the background refresh failed: ")) + o(a(l).error), 1)) : ue("", !0),
        Z(oe, {
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
                n("span", null, o(h.value), 1)
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
        Z(oe, {
          title: a(s).label("建议下一步", "Suggested next step"),
          eyebrow: "Guide"
        }, {
          default: le(() => [
            n("div", {
              class: ge(["status-banner", { "status-banner--warning": i.value.running !== !0 }])
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
            n("pre", wy, o(g(a(l).data.webReport)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : ue("", !0),
        a(s).developerMode ? (m(), He(oe, {
          key: 2,
          title: a(s).label("服务状态原始快照", "Service status snapshot"),
          eyebrow: "Developer"
        }, {
          default: le(() => [
            n("pre", $y, o(g(a(l).data.services)), 1)
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
    const s = je(), l = it(), i = /* @__PURE__ */ B("center"), r = /* @__PURE__ */ B(""), c = /* @__PURE__ */ B(""), u = /* @__PURE__ */ B(!1), d = /* @__PURE__ */ B(""), h = /* @__PURE__ */ B(""), f = at(() => Cy(), t, { immediate: !1 }), p = K(() => [
      { id: "center", label: s.label("恢复中心", "Recovery center") },
      { id: "advanced", label: s.label("高级 Git", "Advanced Git") }
    ]), g = K(() => {
      var A;
      const J = (A = f.data) == null ? void 0 : A.overview;
      return J ? !J.repoReady || J.warnings.length > 0 ? "pill--warning" : J.remoteReady ? "pill--success" : "pill--info" : "pill--muted";
    });
    function _() {
      var A;
      const J = (A = f.data) == null ? void 0 : A.overview;
      return J ? J.protected ? J.remoteReady ? s.label("已上云保护", "Cloud protection ready") : s.label("当前仅本机可恢复", "Local recovery only") : s.label("尚未建立保护", "Protection not set up") : s.label("读取中", "Loading");
    }
    function w(J) {
      const $ = {
        "install-git": { zh: "先安装 Git", en: "Install Git first" },
        "setup-protection": { zh: "先完成保护设置", en: "Complete protection setup first" },
        "save-first-point": { zh: "创建首个恢复点", en: "Create the first recovery point" },
        "save-current-state": { zh: "先保存当前状态", en: "Save the current state first" },
        "review-restored-state": { zh: "检查刚恢复的状态", en: "Review the restored state" },
        "connect-private-remote": { zh: "连接私有仓库", en: "Connect a private remote" },
        "sync-latest-point": { zh: "把最新保护点同步到云端", en: "Sync the latest point to the cloud" },
        protected: { zh: "当前已经受保护", en: "Protection is already in place" }
      }[J || ""];
      return $ ? s.label($.zh, $.en) : J || "-";
    }
    function x(J) {
      return J.kind === "auto" ? s.label("自动保护", "Auto protection") : J.kind === "restore" ? s.label("已恢复到此状态", "Restore point") : s.label("手动保存", "Manual save");
    }
    async function H() {
      await f.execute({ silent: !!f.data });
    }
    async function O() {
      u.value = !0;
      try {
        const J = await xy(r.value.trim() || void 0);
        l.pushToast({
          tone: J.success ? "success" : "error",
          message: J.message
        }), J.success && (r.value = "", await H());
      } catch (J) {
        l.pushToast({
          tone: "error",
          message: J instanceof Error ? J.message : String(J)
        });
      } finally {
        u.value = !1;
      }
    }
    async function M(J) {
      if (await l.confirm({
        title: s.label("恢复到这个状态", "Restore this state"),
        message: s.label(
          `确认回到 ${J.title} 吗？Guard 会先保护当前未提交内容，再在同一主线上追加一个 restore commit，不会删除历史。`,
          `Restore ${J.title}? Guard will first protect any uncommitted changes and then add a restore commit on the same main line without deleting history.`
        ),
        confirmLabel: s.label("确认恢复", "Restore now"),
        cancelLabel: s.label("取消", "Cancel"),
        tone: "danger"
      })) {
        d.value = J.commitSha;
        try {
          const $ = await Ry(J.commitSha);
          l.pushToast({
            tone: $.success ? "success" : "error",
            message: $.message
          }), await H();
        } catch ($) {
          l.pushToast({
            tone: "error",
            message: $ instanceof Error ? $.message : String($)
          });
        } finally {
          d.value = "";
        }
      }
    }
    async function I(J) {
      h.value = J, c.value = "";
      try {
        const A = J === "init" ? await Ey() : J === "private" ? await Ty() : J === "checkpoint" ? await Ay() : J === "push" ? await Py() : J === "sync" ? await Oy() : await My("smart");
        c.value = A.message, l.pushToast({
          tone: A.success ? "success" : "error",
          message: A.message
        }), await H();
      } catch (A) {
        const $ = A instanceof Error ? A.message : String(A);
        c.value = $, l.pushToast({
          tone: "error",
          message: $
        });
      } finally {
        h.value = "";
      }
    }
    function j(J) {
      i.value = J;
    }
    async function te(J) {
      var A;
      typeof navigator > "u" || !((A = navigator.clipboard) != null && A.writeText) || (await navigator.clipboard.writeText(J), l.pushToast({
        tone: "success",
        message: s.label("恢复点哈希已复制。", "Recovery point hash copied.")
      }));
    }
    return Me(() => f.data, (J) => {
      J && (t = J);
    }), ze(() => {
      f.execute({ silent: !!f.data });
    }), (J, A) => (m(), v("div", Iy, [
      n("header", Ny, [
        n("div", null, [
          n("p", Dy, o(a(s).label("备份与恢复 / Second slice", "Backup & Recovery / Second slice")), 1),
          n("h2", Ly, o(a(s).label("备份与恢复", "Backup & Recovery")), 1),
          n("p", Fy, o(a(s).label("默认先讲“保存现在、回到某个状态、然后继续往前走”，把 Git 细节下沉到高级视图。", "Start with save now, go back to a protected state, then keep moving forward, while pushing raw Git details into the advanced view.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: H
        }, o(a(f).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      Z(Sn, {
        items: p.value,
        "active-id": i.value,
        onChange: j
      }, null, 8, ["items", "active-id"]),
      a(f).loading && !a(f).data ? (m(), v("div", Uy, o(a(s).label("正在读取保护状态…", "Loading protection status…")), 1)) : a(f).error && !a(f).data ? (m(), v("div", Vy, o(a(f).error), 1)) : a(f).data ? (m(), v(Y, { key: 2 }, [
        a(f).error ? (m(), v("div", Gy, o(a(s).label("已保留上一版备份与恢复快照，但后台刷新失败：", "The last backup and recovery snapshot is still on screen, but the background refresh failed: ")) + o(a(f).error), 1)) : ue("", !0),
        i.value === "center" ? (m(), v(Y, { key: 1 }, [
          Z(oe, {
            title: a(s).label("当前保护状态", "Current protection state"),
            eyebrow: "Overview"
          }, {
            default: le(() => {
              var $;
              return [
                n("div", By, [
                  n("p", Hy, o(a(s).label("先看这里就能知道现在是否已经受保护、是否已经上云，以及下一步最建议做什么。", "Start here to see whether protection is already in place, whether it has reached the cloud, and what the next recommended action is.")), 1),
                  n("span", {
                    class: ge(["pill", g.value])
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
                    n("span", null, o((($ = a(f).data.overview.latestPoint) == null ? void 0 : $.title) || a(s).label("还没有恢复点", "No recovery point yet")), 1)
                  ]),
                  n("article", Jy, [
                    n("p", Qy, o(a(s).label("最近上云", "Last pushed")), 1),
                    n("strong", null, o(a(st)(a(f).data.overview.lastPushedAt)), 1),
                    n("span", null, o(a(f).data.overview.remoteReady ? a(s).label("云端保护已就绪", "Cloud protection is ready") : a(s).label("当前还没完成云端接线", "Cloud protection is not ready yet")), 1)
                  ]),
                  n("article", Yy, [
                    n("p", Zy, o(a(s).label("下一步建议", "Recommended next step")), 1),
                    n("strong", null, o(w(a(f).data.overview.nextAction)), 1),
                    n("span", null, o(a(f).data.overview.unsyncedChanges ? a(s).label("当前存在未同步变化", "There are unsynced changes right now") : a(s).label("当前没有额外待处理变化", "No extra pending changes right now")), 1)
                  ])
                ])
              ];
            }),
            _: 1
          }, 8, ["title"]),
          Z(oe, {
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
                  n("span", t1, o(w(a(f).data.overview.nextAction)), 1)
                ]),
                n("article", s1, [
                  n("div", null, [
                    n("h3", null, o(a(s).label("回退不会删历史", "Restoring does not delete history")), 1),
                    n("p", null, o(a(s).label("Guard 会在当前主线上追加一个 restore commit，后面的版本会继续接在它后面。", "Guard adds a restore commit on the current main line, and future versions continue after that point.")), 1)
                  ]),
                  n("span", n1, o(a(s).label("同一主线继续", "Continue on the same main line")), 1)
                ]),
                (m(!0), v(Y, null, we(a(f).data.overview.warnings, ($) => (m(), v("article", {
                  key: $,
                  class: "risk-row"
                }, [
                  n("strong", null, o(a(s).label("注意事项", "Warning")), 1),
                  n("span", null, o($), 1)
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          Z(oe, {
            title: a(s).label("立即保存", "Save now"),
            eyebrow: "Checkpoint"
          }, {
            default: le(() => [
              n("div", l1, [
                n("label", a1, [
                  n("span", null, o(a(s).label("恢复点说明（可选）", "Recovery point label (optional)")), 1),
                  n("small", null, o(a(s).label("不写也可以，Guard 会自动生成一个带时间的恢复点标题。", "This is optional. Guard can generate a timestamped title automatically.")), 1),
                  $e(n("input", {
                    "onUpdate:modelValue": A[0] || (A[0] = ($) => r.value = $),
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
                  onClick: O
                }, o(u.value ? a(s).label("保存中…", "Saving…") : a(s).label("保存当前状态", "Save current state")), 9, o1)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          Z(oe, {
            title: a(s).label("恢复点时间线", "Recovery point timeline"),
            eyebrow: "Timeline"
          }, {
            default: le(() => [
              a(f).data.points.length ? (m(), v("div", r1, [
                (m(!0), v(Y, null, we(a(f).data.points, ($) => (m(), v("article", {
                  key: $.id,
                  class: "provider-card"
                }, [
                  n("header", c1, [
                    n("div", null, [
                      n("strong", null, o($.title), 1),
                      n("p", null, o(a(st)($.createdAt)) + " · " + o(a(Na)($.commitSha)), 1)
                    ]),
                    n("div", u1, [
                      n("span", d1, o(x($)), 1),
                      n("span", {
                        class: ge(["pill", $.pushed ? "pill--success" : "pill--warning"])
                      }, o($.pushed ? a(s).label("已上云", "Synced") : a(s).label("仅本机", "Local only")), 3)
                    ])
                  ]),
                  n("p", null, o($.summary), 1),
                  $.sourceCommitSha ? (m(), v("p", f1, o(a(s).label("来源节点：", "Source commit: ")) + o(a(Na)($.sourceCommitSha)), 1)) : ue("", !0),
                  n("div", p1, [
                    n("button", {
                      class: "inline-link",
                      type: "button",
                      onClick: (C) => te($.commitSha)
                    }, o(a(s).label("复制节点", "Copy point")), 9, h1),
                    n("button", {
                      class: "inline-link inline-link--primary",
                      type: "button",
                      disabled: !$.restorable || d.value === $.commitSha,
                      onClick: (C) => M($)
                    }, o(d.value === $.commitSha ? a(s).label("恢复中…", "Restoring…") : a(s).label("回到这个状态", "Restore this state")), 9, g1)
                  ])
                ]))), 128))
              ])) : (m(), v("div", _1, o(a(s).label("当前还没有恢复点。建议先完成一次手动保存。", "No recovery points exist yet. Create a manual save first.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : (m(), v(Y, { key: 2 }, [
          Z(oe, {
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
          Z(oe, {
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
                  disabled: h.value === "init",
                  onClick: A[1] || (A[1] = ($) => I("init"))
                }, o(h.value === "init" ? a(s).label("初始化中…", "Initializing…") : a(s).label("初始化保护仓库", "Initialize protection repo")), 9, A1),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: h.value === "private",
                  onClick: A[2] || (A[2] = ($) => I("private"))
                }, o(h.value === "private" ? a(s).label("检查中…", "Checking…") : a(s).label("检查私有仓库", "Check private remote")), 9, P1),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: h.value === "checkpoint",
                  onClick: A[3] || (A[3] = ($) => I("checkpoint"))
                }, o(h.value === "checkpoint" ? a(s).label("提交中…", "Committing…") : a(s).label("创建本地 checkpoint", "Create local checkpoint")), 9, O1),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: h.value === "push",
                  onClick: A[4] || (A[4] = ($) => I("push"))
                }, o(h.value === "push" ? a(s).label("推送中…", "Pushing…") : a(s).label("推送到云端", "Push to cloud")), 9, M1),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: h.value === "sync",
                  onClick: A[5] || (A[5] = ($) => I("sync"))
                }, o(h.value === "sync" ? a(s).label("同步中…", "Syncing…") : a(s).label("提交并同步", "Commit and sync")), 9, I1)
              ]),
              c.value ? (m(), v("p", N1, o(c.value), 1)) : ue("", !0)
            ]),
            _: 1
          }, 8, ["title"]),
          Z(oe, {
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
          Z(oe, {
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
                  disabled: h.value === "gitignore",
                  onClick: A[6] || (A[6] = ($) => I("gitignore"))
                }, o(h.value === "gitignore" ? a(s).label("写入中…", "Applying…") : a(s).label("追加推荐规则", "Append recommended rules")), 9, Y1)
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
    const s = je(), l = El(), i = Tl(), r = at(() => X1(), t, { immediate: !1 }), c = K(() => {
      var g;
      return ((g = r.data) == null ? void 0 : g.agents) || [];
    }), u = K(() => c.value.filter((g) => g.isDefault).length), d = K(() => c.value.filter((g) => g.workspaceExists).length), h = K(() => c.value.filter((g) => f(g)).length);
    function f(g) {
      return g.docStatus.soul && g.docStatus.user && g.docStatus.agents && g.docStatus.memory;
    }
    function p(g) {
      i.setMode("all"), i.setCurrentPath(g.resolvedWorkspace), i.setSelectedFilePath(""), i.setSelectedMemoryFilePath(""), l.push("/files");
    }
    return Me(() => r.data, (g) => {
      g && (t = g);
    }), ze(() => {
      r.execute({ silent: !!r.data });
    }), (g, _) => (m(), v("div", ew, [
      n("header", tw, [
        n("div", null, [
          n("p", sw, o(a(s).label("角色 / Third slice", "Roles / Third slice")), 1),
          n("h2", nw, o(a(s).label("角色目录", "Role catalog")), 1),
          n("p", lw, o(a(s).label("先把 Agent 目录、默认角色和工作区文档健康度迁进新壳层里，方便后续与文件视图和会话视图打通。", "Move the agent catalog, default role state, and workspace doc health into the new shell so it can connect naturally with Files and Sessions next.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: _[0] || (_[0] = (w) => a(r).execute({ silent: !0 }))
        }, o(a(r).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("Refresh", "Refresh")), 1)
      ]),
      a(r).loading && !a(r).data ? (m(), v("div", aw, o(a(s).label("正在读取角色目录…", "Loading the role catalog…")), 1)) : a(r).error && !a(r).data ? (m(), v("div", iw, o(a(r).error), 1)) : (m(), v(Y, { key: 2 }, [
        a(r).error ? (m(), v("div", ow, o(a(s).label("宸蹭繚鐣欎笂涓€鐗堣鑹茬洰褰曪紝浣嗗悗鍙板埛鏂板け璐ワ細", "The last role catalog is still on screen, but the background refresh failed: ")) + o(a(r).error), 1)) : ue("", !0),
        Z(oe, {
          title: a(s).label("团队概览", "Team overview"),
          eyebrow: "Summary"
        }, {
          default: le(() => [
            n("div", rw, [
              n("article", cw, [
                n("p", uw, o(a(s).label("角色总数", "Roles")), 1),
                n("strong", null, o(a(he)(c.value.length)), 1),
                n("span", null, o(a(s).label("当前已接入到 Guard 的角色目录", "Role entries currently discovered by Guard")), 1)
              ]),
              n("article", dw, [
                n("p", fw, o(a(s).label("默认角色", "Default role")), 1),
                n("strong", null, o(a(he)(u.value)), 1),
                n("span", null, o(u.value > 0 ? a(s).label("至少有一个默认角色", "At least one default role is configured") : a(s).label("还没有默认角色", "No default role is configured yet")), 1)
              ]),
              n("article", pw, [
                n("p", hw, o(a(s).label("工作区可用", "Workspaces ready")), 1),
                n("strong", null, o(a(he)(d.value)), 1),
                n("span", null, o(a(s).label("对应的工作区目录已经存在", "The mapped workspace directory already exists")), 1)
              ]),
              n("article", gw, [
                n("p", _w, o(a(s).label("关键文档齐全", "Core docs ready")), 1),
                n("strong", null, o(a(he)(h.value)), 1),
                _[1] || (_[1] = n("span", null, "SOUL / USER / AGENTS / MEMORY", -1))
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        Z(oe, {
          title: a(s).label("角色成员", "Role entries"),
          eyebrow: "Catalog"
        }, {
          default: le(() => [
            c.value.length ? (m(), v("div", mw, [
              (m(!0), v(Y, null, we(c.value, (w) => (m(), v("article", {
                key: w.id,
                class: "provider-card"
              }, [
                n("header", bw, [
                  n("div", null, [
                    n("strong", null, o(w.name), 1),
                    n("p", null, o(w.resolvedWorkspace || w.workspace), 1)
                  ]),
                  n("div", vw, [
                    w.isDefault ? (m(), v("span", yw, o(a(s).label("默认", "Default")), 1)) : (m(), v("span", ww, o(w.id), 1)),
                    n("span", {
                      class: ge(["pill", w.workspaceExists ? "pill--success" : "pill--warning"])
                    }, o(w.workspaceExists ? a(s).label("工作区就绪", "Workspace ready") : a(s).label("工作区缺失", "Workspace missing")), 3)
                  ])
                ]),
                n("div", $w, [
                  n("div", kw, [
                    n("strong", null, o(a(s).label("模型路由", "Model route")), 1),
                    n("p", null, o(w.modelId || a(s).label("沿用默认模型", "Uses the default model route")), 1)
                  ]),
                  n("div", Sw, [
                    n("strong", null, o(a(s).label("关键文档", "Core docs")), 1),
                    n("div", Cw, [
                      n("span", {
                        class: ge(["pill", w.docStatus.soul ? "pill--success" : "pill--warning"])
                      }, "SOUL", 2),
                      n("span", {
                        class: ge(["pill", w.docStatus.user ? "pill--success" : "pill--warning"])
                      }, "USER", 2),
                      n("span", {
                        class: ge(["pill", w.docStatus.agents ? "pill--success" : "pill--warning"])
                      }, "AGENTS", 2),
                      n("span", {
                        class: ge(["pill", w.docStatus.memory ? "pill--success" : "pill--warning"])
                      }, "MEMORY", 2)
                    ])
                  ])
                ]),
                n("div", xw, [
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    onClick: (x) => p(w)
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
    const t = je(), s = El(), l = it(), i = Tl(), r = /* @__PURE__ */ B(i.searchQuery), c = /* @__PURE__ */ B(!1), u = /* @__PURE__ */ B(null), d = /* @__PURE__ */ B(!1), h = /* @__PURE__ */ B([]), f = K(() => new Set(h.value.map((_) => _.path)).size);
    Me(r, (_) => {
      i.setSearchQuery(_);
    });
    async function p() {
      const _ = r.value.trim();
      if (i.setSearchQuery(_), d.value = !0, u.value = null, !_) {
        h.value = [];
        return;
      }
      c.value = !0;
      try {
        const w = await Aw(_, 100);
        h.value = w.results || [];
      } catch (w) {
        u.value = w instanceof Error ? w.message : String(w);
      } finally {
        c.value = !1;
      }
    }
    function g(_) {
      i.requestReveal(_.path), l.pushToast({
        tone: "info",
        message: t.label("已切到文件页并定位结果。", "Switched to Files and queued the selected result."),
        durationMs: 2200
      }), s.push("/files");
    }
    return ze(() => {
      i.searchQuery.trim() && p();
    }), (_, w) => (m(), v("div", Pw, [
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
      Z(oe, {
        title: a(t).label("搜索条件", "Search query"),
        eyebrow: "Query"
      }, {
        default: le(() => [
          n("form", {
            class: "search-form",
            onSubmit: _s(p, ["prevent"])
          }, [
            $e(n("input", {
              "onUpdate:modelValue": w[0] || (w[0] = (x) => r.value = x),
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
      Z(oe, {
        title: a(t).label("结果概览", "Result overview"),
        eyebrow: "Summary"
      }, {
        default: le(() => [
          n("div", Fw, [
            n("article", Uw, [
              n("p", Vw, o(a(t).label("命中条数", "Matches")), 1),
              n("strong", null, o(a(he)(h.value.length)), 1),
              n("span", null, o(a(t).label("当前查询返回的匹配行数", "Matched lines returned for the current query")), 1)
            ]),
            n("article", Gw, [
              n("p", Bw, o(a(t).label("涉及文件", "Files")), 1),
              n("strong", null, o(a(he)(f.value)), 1),
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
      Z(oe, {
        title: a(t).label("搜索结果", "Results"),
        eyebrow: "Results"
      }, {
        default: le(() => [
          c.value ? (m(), v("div", zw, o(a(t).label("正在查找匹配结果…", "Searching for matching results…")), 1)) : h.value.length ? (m(), v("div", qw, [
            (m(!0), v(Y, null, we(h.value, (x) => (m(), v("article", {
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
                    class: ge(["pill", a(nl)(x.path) ? "pill--success" : "pill--info"])
                  }, o(a(nl)(x.path) ? a(t).label("核心记忆", "Core memory") : a(t).label("文件", "File")), 3)
                ])
              ]),
              n("p", null, o(x.preview), 1),
              n("div", Yw, [
                n("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  onClick: (H) => g(x)
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
}, f$ = { class: "muted-copy" }, p$ = { class: "stat-grid" }, h$ = { class: "stat-card" }, g$ = { class: "stat-card__label" }, _$ = { class: "stat-card" }, m$ = { class: "stat-card__label" }, b$ = { class: "stat-card" }, v$ = { class: "stat-card__label" }, y$ = { class: "provider-stack" }, w$ = { class: "provider-card__header" }, $$ = { class: "pill pill--muted" }, k$ = { class: "mini-list" }, S$ = { class: "provider-card__header" }, C$ = {
  key: 0,
  class: "muted-copy"
}, x$ = {
  key: 0,
  class: "page-empty"
}, R$ = {
  key: 1,
  class: "page-empty page-empty--error"
}, E$ = { class: "muted-copy" }, T$ = { class: "provider-stack" }, A$ = { class: "provider-card__header" }, P$ = { class: "muted-copy" }, O$ = { class: "pill pill--info" }, M$ = { class: "settings-grid settings-grid--wide" }, I$ = { class: "settings-field" }, N$ = { class: "mini-list" }, D$ = { class: "settings-field" }, L$ = { class: "code-panel" }, F$ = { class: "settings-field" }, U$ = { class: "code-panel" }, V$ = { class: "page-actions" }, G$ = ["disabled", "onClick"], B$ = {
  key: 0,
  class: "page-empty"
}, H$ = {
  key: 1,
  class: "page-empty page-empty--error"
}, j$ = { class: "muted-copy" }, W$ = { class: "pill-row" }, K$ = ["href"], z$ = { class: "provider-stack" }, q$ = { class: "provider-card__header" }, J$ = { class: "muted-copy" }, Q$ = { class: "code-panel" }, Y$ = /* @__PURE__ */ Le({
  __name: "SecurityPage",
  setup(e) {
    function t() {
      if (typeof navigator > "u") return "linux";
      const O = navigator.platform.toLowerCase();
      return O.includes("win") ? "windows" : O.includes("mac") ? "macos" : "linux";
    }
    const s = je(), l = it(), i = /* @__PURE__ */ B("audit"), r = /* @__PURE__ */ B(t()), c = /* @__PURE__ */ B(""), u = at(() => t$(), null, { immediate: !1 }), d = at(() => s$(), null, { immediate: !1 }), h = at(() => l$(r.value), null, { immediate: !1 }), f = K(() => [
      { id: "audit", label: s.label("安全检查", "Security checks") },
      { id: "profiles", label: s.label("权限模式", "Permission modes") },
      { id: "hardening", label: s.label("主机加固", "Host hardening") }
    ]), p = K(() => {
      var M, I;
      const O = /* @__PURE__ */ new Map();
      for (const j of ((M = u.data) == null ? void 0 : M.results) || [])
        O.has(j.category) || O.set(j.category, []), (I = O.get(j.category)) == null || I.push(j);
      return Array.from(O.entries());
    });
    Me(
      i,
      (O) => {
        O === "audit" && !u.data && !u.loading && u.execute(), O === "profiles" && !d.data && !d.loading && d.execute(), O === "hardening" && !h.data && !h.loading && h.execute();
      },
      { immediate: !0 }
    ), Me(r, () => {
      i.value === "hardening" && h.execute({ silent: !!h.data });
    });
    function g(O) {
      return O === "pass" ? "pill--success" : O === "warn" ? "pill--warning" : "pill--danger";
    }
    function _(O) {
      return O === "pass" ? s.label("通过", "Pass") : O === "warn" ? s.label("警告", "Warning") : s.label("失败", "Fail");
    }
    async function w() {
      if (i.value === "audit") {
        await u.execute({ silent: !!u.data });
        return;
      }
      if (i.value === "profiles") {
        await d.execute({ silent: !!d.data });
        return;
      }
      await h.execute({ silent: !!h.data });
    }
    async function x(O) {
      c.value = O;
      try {
        const M = await n$(O);
        l.pushToast({
          tone: M.success ? "success" : "error",
          message: M.message
        });
      } catch (M) {
        l.pushToast({
          tone: "error",
          message: M instanceof Error ? M.message : String(M)
        });
      } finally {
        c.value = "";
      }
    }
    function H(O) {
      i.value = O;
    }
    return (O, M) => (m(), v("div", a$, [
      n("header", i$, [
        n("div", null, [
          n("p", o$, o(a(s).label("安全 / Second slice", "Security / Second slice")), 1),
          n("h2", r$, o(a(s).label("安全基线", "Security baseline")), 1),
          n("p", c$, o(a(s).label("把长页面拆成页内分栏，只在当前视图读取必要数据，让安全页面更像决策面板而不是说明书。", "Split the long screen into internal tabs and load only the current view so the security page feels like a decision panel instead of a manual.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: w
        }, o(i.value === "audit" && a(u).refreshing || i.value === "profiles" && a(d).refreshing || i.value === "hardening" && a(h).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新当前视图", "Refresh current view")), 1)
      ]),
      Z(Sn, {
        items: f.value,
        "active-id": i.value,
        onChange: H
      }, null, 8, ["items", "active-id"]),
      i.value === "audit" ? (m(), v(Y, { key: 0 }, [
        a(u).loading ? (m(), v("div", u$, o(a(s).label("正在读取安全检查结果…", "Loading security checks…")), 1)) : a(u).error ? (m(), v("div", d$, o(a(u).error), 1)) : a(u).data ? (m(), v(Y, { key: 2 }, [
          Z(oe, {
            title: a(s).label("安全检查（Beta）", "Security checks (Beta)"),
            eyebrow: "Audit"
          }, {
            default: le(() => [
              n("p", f$, o(a(s).label("这一部分更像建议型检查，而不是正式合规证明。优先处理失败项，其次处理警告项。", "This area behaves like advisory checks rather than a formal proof of compliance. Handle failures first, then warnings.")), 1),
              n("div", p$, [
                n("article", h$, [
                  n("p", g$, o(a(s).label("通过项", "Pass")), 1),
                  n("strong", null, o(a(u).data.summary.pass), 1),
                  n("span", null, o(a(s).label("当前无需处理", "No action needed right now")), 1)
                ]),
                n("article", _$, [
                  n("p", m$, o(a(s).label("警告项", "Warning")), 1),
                  n("strong", null, o(a(u).data.summary.warn), 1),
                  n("span", null, o(a(s).label("建议尽快检查", "Recommended to review soon")), 1)
                ]),
                n("article", b$, [
                  n("p", v$, o(a(s).label("失败项", "Fail")), 1),
                  n("strong", null, o(a(u).data.summary.fail), 1),
                  n("span", null, o(a(s).label("需要优先处理", "Highest priority")), 1)
                ])
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          Z(oe, {
            title: a(s).label("检查详情", "Detailed findings"),
            eyebrow: "Details"
          }, {
            default: le(() => [
              n("div", y$, [
                (m(!0), v(Y, null, we(p.value, ([I, j]) => (m(), v("article", {
                  key: I,
                  class: "provider-card"
                }, [
                  n("header", w$, [
                    n("strong", null, o(I), 1),
                    n("span", $$, o(j.length), 1)
                  ]),
                  n("div", k$, [
                    (m(!0), v(Y, null, we(j, (te) => (m(), v("div", {
                      key: `${I}-${te.item}`,
                      class: "mini-list__item mini-list__item--stack"
                    }, [
                      n("div", S$, [
                        n("strong", null, o(te.item), 1),
                        n("span", {
                          class: ge(["pill", g(te.status)])
                        }, o(_(te.status)), 3)
                      ]),
                      n("p", null, o(te.message), 1),
                      te.fix ? (m(), v("p", C$, o(a(s).label("建议处理：", "Suggested fix: ")) + o(te.fix), 1)) : ue("", !0)
                    ]))), 128))
                  ])
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : ue("", !0)
      ], 64)) : i.value === "profiles" ? (m(), v(Y, { key: 1 }, [
        a(d).loading ? (m(), v("div", x$, o(a(s).label("正在读取权限模式…", "Loading permission modes…")), 1)) : a(d).error ? (m(), v("div", R$, o(a(d).error), 1)) : a(d).data ? (m(), v(Y, { key: 2 }, [
          Z(oe, {
            title: a(s).label("权限模式", "Permission modes"),
            eyebrow: "Profiles"
          }, {
            default: le(() => [
              n("p", E$, o(a(s).label("这些模式当前只会更新 OpenClaw 的工具权限配置，不会自动完成系统账户、ACL、Docker 或整机加固。", "These modes currently update only the OpenClaw tool-permission config. They do not automatically complete system users, ACLs, Docker, or full host hardening.")), 1)
            ]),
            _: 1
          }, 8, ["title"]),
          n("div", T$, [
            (m(!0), v(Y, null, we(a(d).data, (I) => (m(), He(oe, {
              key: I.key,
              title: I.name,
              eyebrow: "Profile"
            }, {
              default: le(() => {
                var j, te;
                return [
                  n("div", A$, [
                    n("p", P$, o(I.description), 1),
                    n("span", O$, o(I.riskLevel || a(s).label("未标注风险等级", "Risk level not declared")), 1)
                  ]),
                  n("div", M$, [
                    n("div", I$, [
                      n("span", null, o(a(s).label("建议使用场景", "Recommended use cases")), 1),
                      n("div", N$, [
                        (m(!0), v(Y, null, we(I.recommendations || [], (J) => (m(), v("div", {
                          key: J,
                          class: "mini-list__item mini-list__item--stack"
                        }, [
                          n("p", null, o(J), 1)
                        ]))), 128))
                      ])
                    ]),
                    n("div", D$, [
                      n("span", null, o(a(s).label("允许规则", "Allow rules")), 1),
                      n("pre", L$, o((((j = I.tools) == null ? void 0 : j.allow) || []).join(`
`) || "(none)"), 1)
                    ]),
                    n("div", F$, [
                      n("span", null, o(a(s).label("拒绝规则", "Deny rules")), 1),
                      n("pre", U$, o((((te = I.tools) == null ? void 0 : te.deny) || []).join(`
`) || "(none)"), 1)
                    ])
                  ]),
                  n("div", V$, [
                    n("button", {
                      class: "inline-link inline-link--primary",
                      type: "button",
                      disabled: c.value === I.key,
                      onClick: (J) => x(I.key)
                    }, o(c.value === I.key ? a(s).label("应用中…", "Applying…") : a(s).label("应用权限模式", "Apply permission mode")), 9, G$)
                  ])
                ];
              }),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : ue("", !0)
      ], 64)) : (m(), v(Y, { key: 2 }, [
        a(h).loading ? (m(), v("div", B$, o(a(s).label("正在读取主机加固建议…", "Loading hardening guidance…")), 1)) : a(h).error ? (m(), v("div", H$, o(a(h).error), 1)) : a(h).data ? (m(), v(Y, { key: 2 }, [
          Z(oe, {
            title: a(s).label("主机加固指南（Beta）", "Host hardening guide (Beta)"),
            eyebrow: "Hardening"
          }, {
            default: le(() => [
              n("p", j$, o(a(s).label("基础建议在所有平台上都一样：尽量使用非管理员账户运行，并把工作区边界收紧。Windows 上的独立低权限账户更适合长期后台运行或共享机器场景，不是所有人的默认强制项。", "The baseline is similar on every platform: prefer non-admin execution and keep the workspace boundary tight. On Windows, a dedicated low-privilege account is better treated as an advanced option for long-running or shared-machine setups, not a blanket default requirement.")), 1),
              n("div", W$, [
                n("button", {
                  class: ge(["pill-button", { "pill-button--active": r.value === "windows" }]),
                  type: "button",
                  onClick: M[0] || (M[0] = (I) => r.value = "windows")
                }, "Windows", 2),
                n("button", {
                  class: ge(["pill-button", { "pill-button--active": r.value === "macos" }]),
                  type: "button",
                  onClick: M[1] || (M[1] = (I) => r.value = "macos")
                }, "macOS", 2),
                n("button", {
                  class: ge(["pill-button", { "pill-button--active": r.value === "linux" }]),
                  type: "button",
                  onClick: M[2] || (M[2] = (I) => r.value = "linux")
                }, "Linux", 2),
                n("a", {
                  class: "inline-link",
                  href: `/api/harden/script?platform=${r.value}`
                }, o(a(s).label("下载脚本", "Download script")), 9, K$)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          n("div", z$, [
            (m(!0), v(Y, null, we(a(h).data.steps, (I) => (m(), He(oe, {
              key: I.id,
              title: I.title,
              eyebrow: "Step"
            }, {
              default: le(() => [
                n("div", q$, [
                  n("p", J$, o(I.description), 1),
                  n("span", {
                    class: ge(["pill", I.optional ? "pill--muted" : "pill--warning"])
                  }, o(I.optional ? a(s).label("可选", "Optional") : a(s).label("建议", "Recommended")), 3)
                ]),
                n("pre", Q$, o((I.commands || []).join(`
`) || a(s).label("当前没有附带命令。", "No commands are attached to this step.")), 1)
              ]),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : ue("", !0)
      ], 64))
    ]));
  }
});
function Z$() {
  return xe("/api/sessions");
}
const X$ = { class: "page-stack" }, ek = { class: "page-header" }, tk = { class: "page-header__eyebrow" }, sk = { class: "page-header__title" }, nk = { class: "page-header__description" }, lk = {
  key: 0,
  class: "page-empty"
}, ak = {
  key: 1,
  class: "page-empty page-empty--error"
}, ik = {
  key: 0,
  class: "status-banner status-banner--warning"
}, ok = { class: "stat-grid" }, rk = { class: "stat-card" }, ck = { class: "stat-card__label" }, uk = { class: "stat-card" }, dk = { class: "stat-card__label" }, fk = { class: "stat-card" }, pk = { class: "stat-card__label" }, hk = { class: "stat-card" }, gk = { class: "stat-card__label" }, _k = { class: "stat-card" }, mk = { class: "stat-card__label" }, bk = { class: "stat-card" }, vk = { class: "stat-card__label" }, yk = { class: "stat-grid" }, wk = { class: "stat-card" }, $k = { class: "stat-card" }, kk = { class: "stat-card__label" }, Sk = { class: "stat-card" }, Ck = { class: "stat-card__label" }, xk = { class: "stat-card" }, Rk = { class: "stat-card__label" }, Ek = { class: "stat-card" }, Tk = { class: "stat-card__label" }, Ak = { class: "stat-card" }, Pk = { class: "stat-card__label" }, Ok = {
  key: 0,
  class: "provider-stack"
}, Mk = { class: "provider-card__header" }, Ik = { class: "pill-row" }, Nk = { class: "pill pill--info" }, Dk = { class: "mini-list" }, Lk = { class: "mini-list__item mini-list__item--stack" }, Fk = { class: "mini-list__item mini-list__item--stack" }, Uk = { class: "mini-list__item mini-list__item--stack" }, Vk = { class: "mini-list__item mini-list__item--stack" }, Gk = {
  key: 1,
  class: "page-empty"
}, Bk = { class: "page-two-column" }, Hk = {
  key: 0,
  class: "provider-stack"
}, jk = { class: "provider-card__header" }, Wk = { class: "pill pill--info" }, Kk = { class: "mini-list" }, zk = {
  key: 1,
  class: "page-empty"
}, qk = {
  key: 0,
  class: "provider-stack"
}, Jk = { class: "provider-card__header" }, Qk = { class: "pill pill--muted" }, Yk = {
  key: 1,
  class: "page-empty"
}, Zk = { class: "list-stack" }, Xk = { class: "stat-grid" }, eS = { class: "stat-card" }, tS = { class: "stat-card__label" }, sS = { class: "stat-card" }, nS = { class: "stat-card__label" }, lS = { class: "stat-card" }, aS = { class: "stat-card__label" }, iS = { class: "stat-card" }, oS = { class: "stat-card__label" }, rS = /* @__PURE__ */ Le({
  __name: "SessionsPage",
  setup(e) {
    let t = null;
    const s = je(), l = at(() => Z$(), t, { immediate: !1 }), i = K(() => {
      var g;
      return (g = l.data) == null ? void 0 : g.snapshot;
    }), r = K(() => {
      var g;
      return ((g = i.value) == null ? void 0 : g.sessions) || [];
    }), c = K(() => {
      var g, _;
      return ((_ = (g = i.value) == null ? void 0 : g.sessionsMeta) == null ? void 0 : _.byAgent) || [];
    }), u = K(() => r.value.filter((g) => !["ended", "finished", "closed"].includes(g.status))), d = K(() => {
      var _;
      const g = (_ = l.data) == null ? void 0 : _.costSummary;
      return g ? Number.isFinite(g.totalEstimatedCost) && (!!g.pricingUnit || g.totalEstimatedCost > 0) : !1;
    });
    function h() {
      var _;
      const g = (_ = l.data) == null ? void 0 : _.costSummary;
      return !g || !d.value ? s.label("无法估算", "Unavailable") : Ia(g.totalEstimatedCost, g.pricingUnit || "USD");
    }
    function f() {
      return d.value ? s.label("仅供本地观察，不代表官方账单", "For local observation only, not an official bill") : s.label("缺少可靠单价或用量数据，当前不显示金额", "Pricing or usage data is incomplete, so no amount is shown");
    }
    function p(g) {
      return ["ended", "finished", "closed"].includes(g.status) ? "pill--muted" : ["error", "failed", "aborted"].includes(g.status) ? "pill--danger" : "pill--success";
    }
    return Me(() => l.data, (g) => {
      g && (t = g);
    }), ze(() => {
      l.execute({ silent: !!l.data });
    }), (g, _) => (m(), v("div", X$, [
      n("header", ek, [
        n("div", null, [
          n("p", tk, o(a(s).label("会话 / Third slice", "Sessions / Third slice")), 1),
          n("h2", sk, o(a(s).label("会话观察台", "Session observer")), 1),
          n("p", nk, o(a(s).label("把运行时快照、按角色会话分布和用量估算迁进新壳层里，同时继续复用现有的共享缓存与后台刷新语义。", "Move runtime snapshots, per-role session distribution, and usage estimates into the new shell while keeping the current shared cache and background refresh semantics.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: _[0] || (_[0] = (w) => a(l).execute({ silent: !0 }))
        }, o(a(l).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("Refresh", "Refresh")), 1)
      ]),
      a(l).loading && !a(l).data ? (m(), v("div", lk, o(a(s).label("正在读取会话快照…", "Loading the session snapshot…")), 1)) : a(l).error && !a(l).data ? (m(), v("div", ak, o(a(l).error), 1)) : a(l).data && i.value ? (m(), v(Y, { key: 2 }, [
        a(l).error ? (m(), v("div", ik, o(a(s).label("已保留上一版会话快照，但后台刷新失败：", "The last session snapshot is still on screen, but the background refresh failed: ")) + o(a(l).error), 1)) : ue("", !0),
        Z(oe, {
          title: a(s).label("会话总览", "Session overview"),
          eyebrow: "Summary"
        }, {
          default: le(() => {
            var w, x, H, O;
            return [
              n("div", ok, [
                n("article", rk, [
                  n("p", ck, o(a(s).label("会话总数", "Sessions")), 1),
                  n("strong", null, o(a(he)(((w = i.value.summary) == null ? void 0 : w.sessionCount) ?? r.value.length)), 1),
                  n("span", null, o(((x = i.value.summary) == null ? void 0 : x.defaultModel) || a(s).label("默认模型未知", "Default model is unknown")), 1)
                ]),
                n("article", uk, [
                  n("p", dk, o(a(s).label("活跃会话", "Active now")), 1),
                  n("strong", null, o(a(he)(u.value.length)), 1),
                  n("span", null, o(a(s).label("当前仍在运行或待执行的会话", "Sessions that are still running or waiting now")), 1)
                ]),
                n("article", fk, [
                  n("p", pk, o(a(s).label("累计 Tokens", "Total tokens")), 1),
                  n("strong", null, o(a(he)(a(l).data.costSummary.totalTokens)), 1),
                  n("span", null, o(a(s).label("基于共享运行时快照统计", "Counted from the shared runtime snapshot")), 1)
                ]),
                n("article", hk, [
                  n("p", gk, o(a(s).label("用量估算", "Usage estimate")), 1),
                  n("strong", null, o(h()), 1),
                  n("span", null, o(f()), 1)
                ]),
                n("article", _k, [
                  n("p", mk, o(a(s).label("会话索引路径", "Session paths")), 1),
                  n("strong", null, o(a(he)(((H = i.value.sessionsMeta) == null ? void 0 : H.paths.length) || 0)), 1),
                  n("span", null, o(a(s).label("被 Guard 识别到的会话目录", "Session directories detected by Guard")), 1)
                ]),
                n("article", bk, [
                  n("p", vk, o(a(s).label("待处理系统事件", "Queued events")), 1),
                  n("strong", null, o(a(he)(((O = i.value.summary) == null ? void 0 : O.queuedSystemEvents) || 0)), 1),
                  n("span", null, o(a(s).label("等待处理的系统级事件", "System events that are still waiting")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        Z(oe, {
          title: a(s).label("运行环境", "Runtime context"),
          eyebrow: "Runtime"
        }, {
          default: le(() => {
            var w, x, H, O, M, I, j, te, J, A, $, C, T, ce, re, me, Re, Ee, V, k, P, be;
            return [
              n("div", yk, [
                n("article", wk, [
                  _[1] || (_[1] = n("p", { class: "stat-card__label" }, "OS", -1)),
                  n("strong", null, o(((w = i.value.os) == null ? void 0 : w.label) || "-"), 1),
                  n("span", null, o([(x = i.value.os) == null ? void 0 : x.platform, (H = i.value.os) == null ? void 0 : H.arch, (O = i.value.os) == null ? void 0 : O.release].filter(Boolean).join(" / ") || a(s).label("系统信息暂缺", "OS details are missing")), 1)
                ]),
                n("article", $k, [
                  n("p", kk, o(a(s).label("记忆检索", "Memory search")), 1),
                  n("strong", null, o(((M = i.value.memory) == null ? void 0 : M.provider) || ((I = i.value.memory) == null ? void 0 : I.backend) || "-"), 1),
                  n("span", null, o([(j = i.value.memory) == null ? void 0 : j.searchMode, ((te = i.value.memory) == null ? void 0 : te.dbPath) || ((J = i.value.memory) == null ? void 0 : J.workspaceDir)].filter(Boolean).join(" / ") || a(s).label("记忆运行态信息暂缺", "Memory runtime details are missing")), 1)
                ]),
                n("article", Sk, [
                  n("p", Ck, o(a(s).label("Gateway 服务", "Gateway service")), 1),
                  n("strong", null, o(((A = i.value.gatewayService) == null ? void 0 : A.label) || "-"), 1),
                  n("span", null, o([($ = i.value.gatewayService) == null ? void 0 : $.loadedText, (C = i.value.gatewayService) == null ? void 0 : C.runtimeShort].filter(Boolean).join(" / ") || a(s).label("Gateway 服务信息暂缺", "Gateway service details are missing")), 1)
                ]),
                n("article", xk, [
                  n("p", Rk, o(a(s).label("Node 服务", "Node service")), 1),
                  n("strong", null, o(((T = i.value.nodeService) == null ? void 0 : T.label) || "-"), 1),
                  n("span", null, o([(ce = i.value.nodeService) == null ? void 0 : ce.loadedText, (re = i.value.nodeService) == null ? void 0 : re.runtimeShort].filter(Boolean).join(" / ") || a(s).label("Node 服务信息暂缺", "Node service details are missing")), 1)
                ]),
                n("article", Ek, [
                  n("p", Tk, o(a(s).label("更新轨道", "Update track")), 1),
                  n("strong", null, o(((me = i.value.update) == null ? void 0 : me.channel) || ((Re = i.value.update) == null ? void 0 : Re.installKind) || "-"), 1),
                  n("span", null, o([(Ee = i.value.update) == null ? void 0 : Ee.packageManager, (V = i.value.update) == null ? void 0 : V.latestVersion].filter(Boolean).join(" / ") || a(s).label("更新信息暂缺", "Update details are missing")), 1)
                ]),
                n("article", Ak, [
                  n("p", Pk, o(a(s).label("安全审计", "Security audit")), 1),
                  n("strong", null, o(a(he)(((k = i.value.securityAudit) == null ? void 0 : k.findingsCount) || 0)), 1),
                  n("span", null, o(`${a(he)(((P = i.value.securityAudit) == null ? void 0 : P.critical) || 0)} critical / ${a(he)(((be = i.value.securityAudit) == null ? void 0 : be.warn) || 0)} warn`), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        Z(oe, {
          title: a(s).label("当前会话", "Current sessions"),
          eyebrow: "Sessions"
        }, {
          default: le(() => [
            r.value.length ? (m(), v("div", Ok, [
              (m(!0), v(Y, null, we(r.value, (w) => (m(), v("article", {
                key: w.id,
                class: "provider-card"
              }, [
                n("header", Mk, [
                  n("div", null, [
                    n("strong", null, o(w.id), 1),
                    n("p", null, o(`${w.agentId} / ${w.modelId}`), 1)
                  ]),
                  n("div", Ik, [
                    n("span", {
                      class: ge(["pill", p(w)])
                    }, o(w.status || "-"), 3),
                    n("span", Nk, o(w.channel || "-"), 1)
                  ])
                ]),
                n("div", Dk, [
                  n("div", Lk, [
                    n("strong", null, o(a(s).label("时间轴", "Timeline")), 1),
                    n("p", null, o(a(s).label("开始：", "Started: ")) + o(a(st)(w.startedAt)), 1),
                    n("p", null, o(a(s).label("更新：", "Updated: ")) + o(a(st)(w.updatedAt)), 1)
                  ]),
                  n("div", Fk, [
                    n("strong", null, o(a(s).label("Token 使用", "Token usage")), 1),
                    n("p", null, o(`${a(he)(w.usage.totalTokens)} tokens`), 1),
                    n("p", null, o(`${a(s).label("输入", "Input")} ${a(he)(w.usage.inputTokens)} / ${a(s).label("输出", "Output")} ${a(he)(w.usage.outputTokens)}`), 1)
                  ]),
                  n("div", Uk, [
                    n("strong", null, o(a(s).label("上下文窗口", "Context window")), 1),
                    n("p", null, o(w.contextTokens != null ? a(he)(w.contextTokens) : "-"), 1),
                    n("p", null, o(a(s).label("剩余：", "Remaining: ")) + o(w.remainingTokens != null ? a(he)(w.remainingTokens) : "-"), 1)
                  ]),
                  n("div", Vk, [
                    n("strong", null, o(a(s).label("用量估算", "Usage estimate")), 1),
                    n("p", null, o(a(Ia)(w.estimatedCost, a(l).data.costSummary.pricingUnit || "USD")), 1),
                    n("p", null, o(a(s).label("上下文占比：", "Context used: ")) + o(a(xf)(w.percentUsed)), 1)
                  ])
                ])
              ]))), 128))
            ])) : (m(), v("div", Gk, o(a(s).label("当前还没有会话记录。", "There are no session records right now.")), 1))
          ]),
          _: 1
        }, 8, ["title"]),
        n("div", Bk, [
          Z(oe, {
            title: a(s).label("按角色分布", "By role"),
            eyebrow: "Roles"
          }, {
            default: le(() => [
              c.value.length ? (m(), v("div", Hk, [
                (m(!0), v(Y, null, we(c.value, (w) => (m(), v("article", {
                  key: w.agentId,
                  class: "provider-card"
                }, [
                  n("header", jk, [
                    n("div", null, [
                      n("strong", null, o(w.agentId), 1),
                      n("p", null, o(w.path || a(s).label("没有返回路径信息", "No path information returned")), 1)
                    ]),
                    n("span", Wk, o(a(he)(w.count)), 1)
                  ]),
                  n("div", Kk, [
                    (m(!0), v(Y, null, we(w.recent.slice(0, 3), (x) => (m(), v("div", {
                      key: x.id,
                      class: "mini-list__item"
                    }, [
                      n("div", null, [
                        n("strong", null, o(x.modelId), 1),
                        n("p", null, o(x.channel), 1)
                      ]),
                      n("span", {
                        class: ge(["pill", p(x)])
                      }, o(x.status), 3)
                    ]))), 128))
                  ])
                ]))), 128))
              ])) : (m(), v("div", zk, o(a(s).label("当前没有按角色聚合的会话数据。", "No per-role session summary is available right now.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          Z(oe, {
            title: a(s).label("最近活动", "Recent activity"),
            eyebrow: "Timeline"
          }, {
            default: le(() => [
              a(l).data.recentActivity.length ? (m(), v("div", qk, [
                (m(!0), v(Y, null, we(a(l).data.recentActivity.slice(0, 10), (w) => (m(), v("article", {
                  key: w.id,
                  class: "provider-card"
                }, [
                  n("header", Jk, [
                    n("div", null, [
                      n("strong", null, o(w.title), 1),
                      n("p", null, o(a(st)(w.createdAt)), 1)
                    ]),
                    n("span", Qk, o(w.type), 1)
                  ]),
                  n("p", null, o(w.description), 1)
                ]))), 128))
              ])) : (m(), v("div", Yk, o(a(s).label("当前还没有最近活动记录。", "There is no recent activity yet.")), 1))
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
            n("div", Zk, [
              (m(!0), v(Y, null, we(i.value.warnings, (w) => (m(), v("article", {
                key: w,
                class: "risk-row"
              }, [
                n("strong", null, o(a(s).label("注意事项", "Warning")), 1),
                n("span", null, o(w), 1)
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
            n("div", Xk, [
              n("article", eS, [
                n("p", tS, o(a(s).label("记忆文件", "Memory files")), 1),
                n("strong", null, o(a(he)(i.value.memory.files)), 1),
                n("span", null, o(a(s).label("当前已接入的记忆文件数量", "Managed memory files detected now")), 1)
              ]),
              n("article", sS, [
                n("p", nS, o(a(s).label("记忆分块", "Chunks")), 1),
                n("strong", null, o(a(he)(i.value.memory.chunks)), 1),
                n("span", null, o(a(s).label("用于搜索的记忆分块数", "Memory chunks available for search")), 1)
              ]),
              n("article", lS, [
                n("p", aS, o(a(s).label("索引状态", "Index state")), 1),
                n("strong", null, o(i.value.memory.dirty === !0 ? a(s).label("待刷新", "Dirty") : i.value.memory.dirty === !1 ? a(s).label("已同步", "Clean") : "-"), 1),
                n("span", null, o(i.value.memory.dbPath || i.value.memory.workspaceDir || a(s).label("没有返回索引路径", "No index path returned")), 1)
              ]),
              n("article", iS, [
                n("p", oS, o(a(s).label("索引目录", "Index location")), 1),
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
}), cS = { class: "page-stack" }, uS = { class: "page-header" }, dS = { class: "page-header__eyebrow" }, fS = { class: "page-header__title" }, pS = { class: "page-header__description" }, hS = { class: "settings-grid" }, gS = { class: "settings-field" }, _S = { class: "settings-value" }, mS = { class: "settings-field" }, bS = { class: "settings-value" }, vS = { class: "settings-toggle" }, yS = { class: "settings-toggle__copy" }, wS = ["checked"], $S = { class: "settings-note" }, kS = /* @__PURE__ */ Le({
  __name: "SettingsPage",
  setup(e) {
    const t = je();
    return (s, l) => (m(), v("div", cS, [
      n("header", uS, [
        n("div", null, [
          n("p", dS, o(a(t).label("Settings", "Settings")), 1),
          n("h2", fS, o(a(t).label("本地偏好与开发者模式", "Local preferences and developer mode")), 1),
          n("p", pS, o(a(t).label("这些设置只保存在当前浏览器里，不会改服务器，也不会影响其他使用者。", "These preferences stay in the current browser only. They do not change the server and do not affect other users.")), 1)
        ])
      ]),
      Z(oe, {
        title: a(t).label("界面偏好", "Interface preferences"),
        eyebrow: "Preferences"
      }, {
        default: le(() => [
          n("div", hS, [
            n("article", gS, [
              n("div", null, [
                n("h3", null, o(a(t).label("主题", "Theme")), 1),
                n("p", null, o(a(t).label("当前控制台主题模式。", "The current theme mode used by the console.")), 1)
              ]),
              n("strong", _S, o(a(t).themePreference === "auto" ? a(t).label("跟随系统", "Auto") : a(t).themePreference === "light" ? a(t).label("浅色", "Light") : a(t).label("深色", "Dark")), 1)
            ]),
            n("article", mS, [
              n("div", null, [
                n("h3", null, o(a(t).label("语言", "Language")), 1),
                n("p", null, o(a(t).label("当前控制台显示语言。", "The display language currently used by the console.")), 1)
              ]),
              n("strong", bS, o(a(t).language === "zh" ? "中文" : "English"), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      Z(oe, {
        title: a(t).label("开发者模式", "Developer mode"),
        eyebrow: "Developer"
      }, {
        default: le(() => [
          n("label", vS, [
            n("div", yS, [
              n("strong", null, o(a(t).label("显示调试与原始信息", "Show debug and raw views")), 1),
              n("span", null, o(a(t).label("开启后会显示原始 JSON、诊断区和后续的后台刷新提示，适合排查问题时使用。", "When enabled, the console can reveal raw JSON, diagnostics, and future background refresh hints for troubleshooting.")), 1)
            ]),
            n("input", {
              checked: a(t).developerMode,
              type: "checkbox",
              onChange: l[0] || (l[0] = (i) => a(t).setDeveloperMode(i.target.checked))
            }, null, 40, wS)
          ]),
          n("div", $S, o(a(t).label("默认建议关闭，这样界面更适合普通使用。只有在排障或看原始配置时再打开。", "Keep this off by default for a cleaner operator experience. Turn it on only when you need diagnostics or raw configuration views.")), 1)
        ]),
        _: 1
      }, 8, ["title"])
    ]));
  }
}), SS = Qd({
  history: Ad(),
  routes: [
    { path: "/", name: "overview", component: Sg },
    { path: "/operations", name: "operations", component: Sy },
    { path: "/openclaw", name: "openclaw", component: sy },
    { path: "/channels", name: "channels", component: Sp },
    { path: "/models", name: "models", component: Ab },
    { path: "/security", name: "security", component: Y$ },
    { path: "/recovery", name: "recovery", component: Z1 },
    { path: "/roles", name: "roles", component: Tw },
    { path: "/files", name: "files", component: lm },
    { path: "/search", name: "search", component: e$ },
    { path: "/sessions", name: "sessions", component: rS },
    { path: "/logs", name: "logs", component: Rm },
    { path: "/notifications", name: "notifications", component: Iv },
    { path: "/cron", name: "cron", component: tg },
    { path: "/settings", name: "settings", component: kS },
    { path: "/ai", redirect: "/models" },
    { path: "/git-sync", redirect: "/recovery" },
    { path: "/memory", redirect: "/files" },
    { path: "/activity", redirect: "/notifications" },
    { path: "/costs", redirect: "/sessions" }
  ]
});
Hc(Cf).use(Kc()).use(SS).mount("#guard-next-app");
