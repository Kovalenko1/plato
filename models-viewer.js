const STEP_MODELS = [
  { label: 'ПЛАТО 2', path: 'assets/models/Плато 2/(.STEP)/3D Сборка 1.stp' },
  { label: 'ПЛАТО 3', path: 'assets/models/Плато 3/(.STEP)/3D Сборка 2.stp' },
  { label: 'ПЛАТО 4', path: 'assets/models/Плато 4/(.STEP)/3D Сборка 3.stp' },
];

function populateSelect() {
  const select = document.getElementById('modelSelect');
  if (!select) return;

  select.textContent = '';

  for (const model of STEP_MODELS) {
    const option = document.createElement('option');
    option.value = model.path;
    option.textContent = model.label;
    select.appendChild(option);
  }
}

let viewerPromise = null;

async function ensureViewer() {
  if (viewerPromise) return viewerPromise;

  viewerPromise = (async () => {
    const [THREE, { OrbitControls }] = await Promise.all([
      import('three'),
      import('three/addons/controls/OrbitControls.js'),
    ]);

    const canvas = document.getElementById('modelsCanvas');
    const view = document.getElementById('modelsView');
    if (!canvas || !view) {
      throw new Error('Не найден контейнер 3D-вьюера.');
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100000.0);
    camera.up.set(0.0, 0.0, 1.0);
    camera.position.set(800, 800, 800);

    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff, 0.65));

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(1, 1, 1);
    scene.add(dirLight);

    const modelRoot = new THREE.Group();
    scene.add(modelRoot);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    function resize() {
      const rect = view.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    resize();
    const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null;
    ro?.observe(view);
    window.addEventListener('resize', resize);

    function disposeObject(object3d) {
      object3d.traverse((child) => {
        if (!child.isMesh) return;
        if (child.geometry) child.geometry.dispose();
        const material = child.material;
        if (!material) return;
        if (Array.isArray(material)) {
          for (const mat of material) mat.dispose();
        } else {
          material.dispose();
        }
      });
    }

    function buildMesh(geometryMesh) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(geometryMesh.attributes.position.array, 3),
      );
      if (geometryMesh.attributes.normal) {
        geometry.setAttribute(
          'normal',
          new THREE.Float32BufferAttribute(geometryMesh.attributes.normal.array, 3),
        );
      } else {
        geometry.computeVertexNormals();
      }

      const index = Uint32Array.from(geometryMesh.index.array);
      geometry.setIndex(new THREE.BufferAttribute(index, 1));
      geometry.computeBoundingSphere();

      const color = geometryMesh.color
        ? new THREE.Color(geometryMesh.color[0], geometryMesh.color[1], geometryMesh.color[2])
        : new THREE.Color(0.82, 0.84, 0.88);

      const material = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.08,
        roughness: 0.75,
      });

      return new THREE.Mesh(geometry, material);
    }

    function frameObject(object3d) {
      const box = new THREE.Box3().setFromObject(object3d);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      object3d.position.sub(center);
      controls.target.set(0, 0, 0);

      const maxDim = Math.max(size.x, size.y, size.z);
      if (!Number.isFinite(maxDim) || maxDim <= 0) return;

      const fov = (camera.fov * Math.PI) / 180;
      const distance = (maxDim / (2 * Math.tan(fov / 2))) * 1.6;
      camera.near = Math.max(0.1, maxDim / 100);
      camera.far = Math.max(1000, maxDim * 100);
      camera.position.set(distance, distance, distance);
      camera.updateProjectionMatrix();
      controls.update();
    }

    renderer.setAnimationLoop(() => {
      controls.update();
      renderer.render(scene, camera);
    });

    let occtPromise = null;
    async function getOcct() {
      if (typeof window.occtimportjs !== 'function') {
        throw new Error('Библиотека occt-import-js не загрузилась.');
      }
      if (!occtPromise) occtPromise = window.occtimportjs();
      return occtPromise;
    }

    return {
      async loadStepFromUrl(path) {
        const occt = await getOcct();
        const response = await fetch(new URL(path, window.location.href));
        if (!response.ok) {
          throw new Error(`Не удалось загрузить модель (${response.status}).`);
        }

        const buffer = await response.arrayBuffer();
        const fileBuffer = new Uint8Array(buffer);
        const result = occt.ReadStepFile(fileBuffer, {
          linearUnit: 'millimeter',
          linearDeflectionType: 'bounding_box_ratio',
          linearDeflection: 0.002,
          angularDeflection: 0.5,
        });
        if (!result || !result.success) {
          throw new Error('Импорт STEP не удался.');
        }

        disposeObject(modelRoot);
        modelRoot.clear();

        const group = new THREE.Group();
        for (const geometryMesh of result.meshes) {
          group.add(buildMesh(geometryMesh));
        }
        modelRoot.add(group);
        frameObject(group);
      },
      reset() {
        disposeObject(modelRoot);
        modelRoot.clear();
      },
    };
  })();

  return viewerPromise;
}

function setOverlay(text, hidden) {
  const overlay = document.getElementById('modelsOverlay');
  if (!overlay) return;

  overlay.textContent = text;
  overlay.classList.toggle('hidden', Boolean(hidden));
}

let isLoading = false;

async function loadFromSelect(select) {
  if (isLoading) return;

  const path = select.value;
  if (!path) {
    setOverlay('Нет доступных моделей.', false);
    return;
  }

  isLoading = true;
  select.disabled = true;
  setOverlay('Загрузка…', false);
  try {
    const viewer = await ensureViewer();
    await viewer.loadStepFromUrl(path);
    setOverlay('', true);
  } catch (err) {
    setOverlay(err instanceof Error ? err.message : 'Не удалось загрузить модель.', false);
  } finally {
    select.disabled = false;
    isLoading = false;
  }
}

function init() {
  populateSelect();

  const select = document.getElementById('modelSelect');
  if (!select || !(select instanceof HTMLSelectElement)) return;

  if (!select.value && STEP_MODELS[0]?.path) {
    select.value = STEP_MODELS[0].path;
  }

  select.addEventListener('change', () => loadFromSelect(select));
  loadFromSelect(select);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
