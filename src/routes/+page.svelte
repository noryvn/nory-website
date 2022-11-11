<script lang="ts">
	import Icon from "@iconify/svelte";
</script>

<div class="hero bg-base-200">
	<div class="hero-content">
		<div class="max-w-sm">
			<h1 class="text-5xl font-bold">Nory</h1>
			<p>
				Hai Kak, Nory adalah solusi mu jika kakak ingin punya website untuk jadwal sekolah ataupun
				daftar pelajaran.
			</p>
			<p>
				Mohon dimaklumi ya kak jika ada sesuatu yang berjalan tidak semestinya. Karena Nory masih
				dalam tahap awal pengembangan.
			</p>
			<div class="justify-center flex w-full">
				<a href="/user" class="btn btn-primary"> Mulai </a>
			</div>
		</div>
	</div>
</div>

<div class="p-8 mx-auto">
	<div class="card w-96 bg-base-200 card-bordered border-base-content my-4">
		<div class="card-body">
			<h2 class="card-title">Tech Stacks</h2>
			<p>
				Nory menggunakan beberapa teknologi yang memiliki performa yang bagus. Beberapa teknologi
				tersebut adalah:
			</p>
			<div class="card-actions justify-end">
				<a
					rel="noreferrer"
					href="https://svelte.dev"
					target="_blank"
					class="btn btn-primary btn-sm"
				>
					<Icon icon="carbon:logo-svelte" class="h-6 mr-2" />
					Svelte
				</a>
				<a
					rel="noreferrer"
					href="https://tailwindcss.com"
					target="_blank"
					class="btn btn-primary btn-sm"
				>
					<Icon icon="mdi:tailwind" class="h-6 mr-2" />
					Tailwind
				</a>
				<a rel="noreferrer" href="https://go.dev" target="_blank" class="btn btn-primary btn-sm">
					<Icon icon="mdi:language-go" class="h-6 mr-2" />
					Go
				</a>
				<a
					rel="noreferrer"
					href="https://typescriptlang.org"
					target="_blank"
					class="btn btn-primary btn-sm"
				>
					<Icon icon="mdi:language-typescript" class="h-6 mr-2" />
					Typescript
				</a>
			</div>
		</div>
	</div>
	<div class="card w-96 bg-base-200 card-bordered border-base-content my-4">
		<div class="card-body">
			<h2 class="card-title">Naming</h2>
			<p>
				Mungkin kakak berfikiran bahwa penamaan Nory adalah kata yang diambil secara acak. Alasan
				penamaan Nory adalah...
			</p>
		</div>
	</div>
	<div class="card w-96 bg-base-200 card-bordered border-base-content my-4">
		<div class="card-body">
			<h2 class="card-title">Open Source</h2>
			<p>
				Nory adalah project sumber terbuka yang setiap baris kodenya dapat kalian lihat pada github.
				Kalian juga dapat berkontribusi untuk project ini.
			</p>
			<div class="card-actions justify-end">
				<a
					rel="noreferrer"
					href=""
					target="_blank"
					class="btn btn-primary btn-sm"
				>
					<Icon icon="mdi:github" class="h-6 mr-2" />
					Github
				</a>
			</div>
		</div>
	</div>
</div>
